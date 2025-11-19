import glyphs from '../data/glyphs.json';
import translationMap from '../data/translationMap.json';
import { Glyph, TranslationMap } from '../types/domain';

// 1. Index Glyphs by ID for O(1) lookup
const glyphLookup = new Map<string, Glyph>();
(glyphs as Glyph[]).forEach(g => glyphLookup.set(g.glyphId, g));

// 2. Type Cast Map
const map = translationMap as TranslationMap;

// 3. Sort keys by length (DESC) to ensure greedy matching
// e.g., ["sh", "th", "ch", "a", "b", ...]
const sortedKeys = Object.keys(map).sort((a, b) => b.length - a.length);

export const translateText = (input: string): Glyph[] => {
    if (!input) return [];

    const sanitized = input.toLowerCase();
    const result: Glyph[] = [];
    let cursor = 0;

    while (cursor < sanitized.length) {
        let matchFound = false;

        // Try to match the longest possible phoneme starting at current cursor
        for (const phoneme of sortedKeys) {
            if (sanitized.startsWith(phoneme, cursor)) {
                // HIT! Found a match (e.g., "sh")
                const potentialIds = map[phoneme];
                // Simple logic: take the first variant for now. 
                // (Future: Randomize or context-aware)
                const glyphId = potentialIds[0];

                const glyph = glyphLookup.get(glyphId);
                if (glyph) {
                    result.push(glyph);
                }

                cursor += phoneme.length; // Advance cursor by length of match
                matchFound = true;
                break; // Stop checking other keys, restart loop from new cursor
            }
        }

        // If no match found (e.g., number, space, symbol), skip one character
        if (!matchFound) {
            cursor++;
        }
    }

    return result;
};