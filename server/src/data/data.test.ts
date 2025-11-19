import { Glyph, TranslationMap } from '../types/domain';
import glyphs from './glyphs.json';
import translationMap from './translationMap.json';

// Cast to Types to ensure TS validates structure
const glyphData: Glyph[] = glyphs as Glyph[];
const mapData: TranslationMap = translationMap as TranslationMap;

describe('Data Integrity Check', () => {
    it('should have valid glyph objects', () => {
        expect(glyphData.length).toBeGreaterThan(0);
        glyphData.forEach(g => {
            expect(g).toHaveProperty('glyphId');
            expect(g).toHaveProperty('imageUrl');
            expect(g).toHaveProperty('phonetic');
        });
    });

    it('should ensure all translation map targets exist in glyphs.json', () => {
        // 1. Create a Set of all valid IDs for O(1) lookup
        const validIds = new Set(glyphData.map(g => g.glyphId));

        // 2. Iterate through every phonetic key
        Object.entries(mapData).forEach(([phoneme, targetIds]) => {
            // 3. Iterate through every target ID for that phoneme
            targetIds.forEach(id => {
                if (!validIds.has(id)) {
                    throw new Error(`Integrity Error: Phoneme "${phoneme}" points to non-existent Glyph ID "${id}"`);
                }
                expect(validIds.has(id)).toBe(true);
            });
        });
    });
});