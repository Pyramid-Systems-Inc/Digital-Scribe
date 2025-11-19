export interface Glyph {
    glyphId: string;      // Unique ID (e.g., "G1", "D58")
    phonetic: string;     // The sound it represents (e.g., "a", "sh")
    unicode: string;      // Standard Unicode code point
    description: string;  // Semantic meaning (e.g., "Egyptian Vulture")
    category: string;     // Gardiner's category (e.g., "Birds")
    imageUrl: string;     // Path to the SVG/PNG
}

export interface TranslationMap {
    [phoneme: string]: string[]; // "sh" -> ["V13", "Q3"] (Array allows variants)
}