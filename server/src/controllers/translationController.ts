import { Request, Response } from 'express';
import * as fs from 'fs';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import * as path from 'path';

// Interface matching the actual JSON structure in glyphs.json
interface JsonGlyph {
  glyphId: string;
  unicode: string;
  phoneticValue: string;
  description: string;
  category: string;
  imageUrl: string;
}

// Interface for the response object (combining JSON data + frontend expectations)
interface ResponseGlyph extends JsonGlyph {
  gardinerCode: string; // Frontend expects this property
}

// The JSON file is a direct map of strings to string arrays
type TranslationMap = { [key: string]: string[] };

// Initialize lowdb
const adapter = new JSONFile<TranslationMap>(path.join(__dirname, '../data/translationMap.json'));
const db = new Low<TranslationMap>(adapter, {});

// Load glyphs data synchronously with error checking
let glyphsData: JsonGlyph[] = [];
try {
  const glyphsPath = path.join(__dirname, '../data/glyphs.json');
  const rawData = fs.readFileSync(glyphsPath, 'utf8');
  glyphsData = JSON.parse(rawData);
  console.log(`[Server] Loaded ${glyphsData.length} glyph definitions.`);

  // Debug: Print keys of the first glyph to verify structure
  if (glyphsData.length > 0) {
    console.log(`[Server] Data structure check - Keys: ${Object.keys(glyphsData[0]).join(', ')}`);
  }
} catch (error) {
  console.error('[Server] CRITICAL ERROR: Could not load glyphs.json', error);
}

interface TranslationRequest {
  text: string;
}

const DIGRAPHS = ['sh', 'th', 'ch', 'wh'];

export const translateText = async (req: Request, res: Response): Promise<void> => {
  try {
    // Ensure DB is loaded
    if (!db.data || Object.keys(db.data).length === 0) {
      await db.read();
    }

    // Default to empty object if read failed
    const translationMap = db.data || {};
    const { text }: TranslationRequest = req.body;

    if (!text || typeof text !== 'string') {
      res.status(400).json({
        error: 'Invalid input',
        message: 'Text field is required and must be a non-empty string'
      });
      return;
    }

    const sanitizedText = text.toLowerCase().trim();

    if (sanitizedText.length === 0) {
      res.status(400).json({
        error: 'Invalid input',
        message: 'Text cannot be empty'
      });
      return;
    }

    console.log(`[Translation] Processing text: "${sanitizedText}"`);

    const translatedGlyphs: ResponseGlyph[] = [];
    let i = 0;

    while (i < sanitizedText.length) {
      let matched = false;

      // 1. Check Digraphs (Multi-character sounds) first
      for (const digraph of DIGRAPHS) {
        if (sanitizedText.substring(i, i + digraph.length) === digraph) {
          const glyphIds = translationMap[digraph];

          if (glyphIds && glyphIds.length > 0) {
            const targetId = glyphIds[0];

            // FIX: Search using 'glyphId' which exists in the JSON
            const glyph = glyphsData.find((g) => g.glyphId === targetId);

            if (glyph) {
              translatedGlyphs.push({
                ...glyph,
                gardinerCode: glyph.glyphId // Add alias for frontend compatibility
              });
              console.log(`[Translation] Matched digraph "${digraph}" -> ${targetId}`);
            } else {
              console.warn(`[Translation] WARNING: ID ${targetId} found in map but not in glyphs.json`);
            }
          }

          i += digraph.length;
          matched = true;
          break;
        }
      }

      // 2. Check Single Characters if no digraph matched
      if (!matched) {
        const char = sanitizedText[i];

        // Skip non-alphabetic characters
        if (char.match(/[^a-z]/)) {
          i++;
          continue;
        }

        const glyphIds = translationMap[char];

        if (glyphIds && glyphIds.length > 0) {
          const targetId = glyphIds[0];

          // FIX: Search using 'glyphId'
          const glyph = glyphsData.find((g) => g.glyphId === targetId);

          if (glyph) {
            translatedGlyphs.push({
              ...glyph,
              gardinerCode: glyph.glyphId // Add alias for frontend compatibility
            });
            console.log(`[Translation] Matched character "${char}" -> ${targetId}`);
          } else {
            console.warn(`[Translation] WARNING: ID ${targetId} found in map but not in glyphs.json`);
          }
        } else {
          console.log(`[Translation] No mapping found for character: "${char}"`);
        }

        i++;
      }
    }

    console.log(`[Translation] Completed. Found ${translatedGlyphs.length} glyphs`);

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
      message: 'An internal server error occurred'
    });
  }
};