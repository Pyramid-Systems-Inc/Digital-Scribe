import { Request, Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

// Load JSON data
const glyphsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/glyphs.json'), 'utf8'));
const translationMap = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/translationMap.json'), 'utf8'));

// Type definitions
interface Glyph {
  glyphId: string;
  unicode: string;
  phoneticValue: string;
  description: string;
  category: string;
  imageUrl: string;
}

interface TranslationRequest {
  text: string;
}

// Multi-character phonemes that should be checked first
const DIGRAPHS = ['sh', 'th', 'ch', 'wh'];

/**
 * Translates English text to hieroglyphs using phonetic mapping
 */
export const translateText = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text }: TranslationRequest = req.body;

    // Input validation
    if (!text || typeof text !== 'string') {
      res.status(400).json({
        error: 'Invalid input',
        message: 'Text field is required and must be a non-empty string'
      });
      return;
    }

    // Sanitize input - lowercase and trim whitespace
    const sanitizedText = text.toLowerCase().trim();

    if (sanitizedText.length === 0) {
      res.status(400).json({
        error: 'Invalid input',
        message: 'Text cannot be empty after sanitization'
      });
      return;
    }

    console.log(`[Translation] Processing text: "${sanitizedText}"`);

    // Translation logic
    const translatedGlyphs: Glyph[] = [];
    let i = 0;

    while (i < sanitizedText.length) {
      let matched = false;

      // Check for multi-character matches (digraphs) first
      for (const digraph of DIGRAPHS) {
        if (sanitizedText.substring(i, i + digraph.length) === digraph) {
          const glyphIds = translationMap[digraph as keyof typeof translationMap];
          
          if (glyphIds && glyphIds.length > 0) {
            // Use the first glyph ID for the phoneme
            const glyphId = glyphIds[0];
            const glyph = glyphsData.find((g: Glyph) => g.glyphId === glyphId);
            
            if (glyph) {
              translatedGlyphs.push(glyph);
              console.log(`[Translation] Matched digraph "${digraph}" -> ${glyphId}`);
            }
          }
          
          i += digraph.length;
          matched = true;
          break;
        }
      }

      // If no digraph matched, check single character
      if (!matched) {
        const char = sanitizedText[i];
        
        // Skip spaces, numbers, and punctuation
        if (char.match(/[^a-z]/)) {
          console.log(`[Translation] Skipping character: "${char}"`);
          i++;
          continue;
        }

        // Look up single character in translation map
        const glyphIds = translationMap[char as keyof typeof translationMap];
        
        if (glyphIds && glyphIds.length > 0) {
          // Use the first glyph ID for the character
          const glyphId = glyphIds[0];
          const glyph = glyphsData.find((g: Glyph) => g.glyphId === glyphId);
          
          if (glyph) {
            translatedGlyphs.push(glyph);
            console.log(`[Translation] Matched character "${char}" -> ${glyphId}`);
          }
        } else {
          console.log(`[Translation] No mapping found for character: "${char}"`);
        }
        
        i++;
      }
    }

    console.log(`[Translation] Completed. Found ${translatedGlyphs.length} glyphs`);

    // Return the ordered array of glyph objects
    res.json({
      originalText: text,
      sanitizedText: sanitizedText,
      glyphs: translatedGlyphs,
      count: translatedGlyphs.length
    });

  } catch (error) {
    console.error('[Translation] Error processing translation:', error);
    res.status(500).json({
      error: 'Translation failed',
      message: 'An internal server error occurred while processing the translation'
    });
  }
};