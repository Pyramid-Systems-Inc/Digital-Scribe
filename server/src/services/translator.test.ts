import { translateText } from './translator';

describe('Translation Service (Business Logic)', () => {
    it('should return an empty array for empty input', () => {
        const result = translateText('');
        expect(result).toEqual([]);
    });

    it('should translate single characters', () => {
        const result = translateText('a');
        expect(result).toHaveLength(1);
        expect(result[0].phonetic).toBe('a');
        expect(result[0].glyphId).toBe('G1');
    });

    it('should prioritize digraphs (e.g., "sh" over "s" + "h")', () => {
        const result = translateText('sh');
        // Should be 1 glyph (M8), NOT 2 glyphs (S29 + V28)
        expect(result).toHaveLength(1);
        expect(result[0].phonetic).toBe('sh');
        expect(result[0].glyphId).toBe('M8');
    });

    it('should handle mixed content correctly', () => {
        // "bash" -> b (D58) - a (G1) - sh (M8)
        const result = translateText('bash');
        expect(result).toHaveLength(3);
        expect(result[0].phonetic).toBe('b');
        expect(result[2].phonetic).toBe('sh');
    });

    it('should ignore characters not in the map (numbers/symbols)', () => {
        const result = translateText('a1!');
        expect(result).toHaveLength(1);
        expect(result[0].phonetic).toBe('a');
    });

    it('should be case insensitive', () => {
        const result = translateText('A');
        expect(result[0].glyphId).toBe('G1');
    });
});