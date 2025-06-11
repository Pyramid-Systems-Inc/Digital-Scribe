export interface GlyphType {
  id: string; // Or number, depending on your data
  gardinerCode: string;
  unicode?: string;
  phoneticValue?: string;
  description?: string;
  category?: string;
  // Add other properties as needed from your glyphs.json
  sign?: string; // From glyphs.json
  translation?: string; // From glyphs.json
  notes?: string; // From glyphs.json
}