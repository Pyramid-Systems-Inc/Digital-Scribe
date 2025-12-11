/**
 * Core Type Definitions for The Digital Scribe 2.0
 *
 * This file contains all TypeScript type definitions for the application,
 * including glyph data, translation results, theming, and API contracts.
 *
 * @module types
 * @version 1.0.0
 */

// =============================================================================
// CORE GLYPH TYPES
// =============================================================================

/**
 * Gardiner Sign List categories for hieroglyph classification.
 * Each category groups related hieroglyphs by subject matter.
 */
export type GardinerCategory =
  | "A"  // Man and his occupations
  | "B"  // Woman and her occupations
  | "C"  // Anthropomorphic deities
  | "D"  // Parts of the human body
  | "E"  // Mammals
  | "F"  // Parts of mammals
  | "G"  // Birds
  | "H"  // Parts of birds
  | "I"  // Amphibious animals, reptiles, etc.
  | "K"  // Fishes and parts of fishes
  | "L"  // Invertebrates and lesser animals
  | "M"  // Trees and plants
  | "N"  // Sky, earth, water
  | "O"  // Buildings, parts of buildings, etc.
  | "P"  // Ships and parts of ships
  | "Q"  // Domestic and funerary furniture
  | "R"  // Temple furniture and sacred emblems
  | "S"  // Crowns, dress, staves, etc.
  | "T"  // Warfare, hunting, butchery
  | "U"  // Agriculture, crafts, and professions
  | "V"  // Rope, fiber, baskets, bags, etc.
  | "W"  // Vessels of stone and earthenware
  | "X"  // Loaves and cakes
  | "Y"  // Writings, games, music
  | "Z"  // Strokes, geometrical figures
  | "Aa"; // Unclassified

/**
 * Hieroglyph definition with Gardiner code, phonetic value, and metadata.
 * Represents a single hieroglyph with complete metadata for display and translation.
 */
export interface IGlyph {
  /** Unique identifier (matches Gardiner code) */
  readonly id: string;

  /** Gardiner Sign List code (e.g., "G1", "M17", "D21") */
  readonly gardinerCode: string;

  /** Category from Gardiner classification */
  readonly category: GardinerCategory;

  /** Phonetic value(s) this glyph can represent */
  readonly phoneticValue: readonly string[];

  /** Primary phonetic value for translation matching */
  readonly primaryPhonetic: string;

  /** English name of the glyph (what it depicts) */
  readonly name: string;

  /** Detailed description of what the glyph depicts */
  readonly description: string;

  /** Unicode code point if available (e.g., "𓀀") */
  readonly unicode?: string;

  /** Path to SVG asset (relative to /public/glyphs/) */
  readonly svgPath: string;

  /** Alternative SVG variants if available */
  readonly variants?: readonly string[];

  /** Transliteration in Egyptological convention */
  readonly transliteration: string;

  /** Tags for search and filtering */
  readonly tags: readonly string[];

  /** Whether this is a determinative (semantic classifier) */
  readonly isDeterminative: boolean;

  /** Whether this is commonly used in phonetic spelling */
  readonly isPhonetic: boolean;

  /** Whether this is a commonly used glyph (for quick access) */
  readonly isCommon: boolean;
}

// =============================================================================
// TRANSLATION TYPES
// =============================================================================

/**
 * Token type classification for translation output.
 */
export type TokenType =
  | "phonetic"      // Matched to a phonetic glyph
  | "unknown"       // No matching glyph found
  | "space"         // Word separator
  | "punctuation"   // Preserved punctuation
  | "determinative"; // Semantic classifier

/**
 * A single translation token linking source text to glyph.
 * Represents one unit of translation output.
 */
export interface GlyphToken {
  /** Unique identifier for this token instance (for React keys) */
  readonly id: string;

  /** Original source characters that produced this token */
  readonly source: string;

  /** Type classification of this token */
  readonly type: TokenType;

  /** Matched glyph data (null if unknown/space/punctuation) */
  readonly glyph: IGlyph | null;

  /** Position index in the original input string */
  readonly position: number;

  /** Length of source characters consumed */
  readonly length: number;

  /** Confidence score for this match (0-1) */
  readonly confidence: number;

  /** Alternative glyph matches if available */
  readonly alternatives?: readonly IGlyph[];
}

/**
 * Orientation for glyph display in cartouche.
 */
export type CartoucheOrientation = "horizontal" | "vertical";

/**
 * Complete translation output with tokens and metadata.
 */
export interface TranslationResult {
  /** Original input text */
  readonly input: string;

  /** Original input text (alias for compatibility) */
  readonly originalText: string;

  /** Normalized/processed input text */
  readonly normalized: string;

  /** Normalized text (alias for compatibility) */
  readonly normalizedText: string;

  /** Array of translation tokens in order */
  readonly tokens: readonly GlyphToken[];

  /** Characters that could not be translated */
  readonly unknownCharacters: readonly string[];

  /** Optional notes about approximations or special handling */
  readonly warnings: readonly string[];

  /** Total number of glyphs in result */
  readonly glyphCount: number;

  /** Number of successfully translated characters */
  readonly translatedCount: number;

  /** Number of unknown characters */
  readonly unknownCount: number;

  /** Translation success rate (0-1) */
  readonly successRate: number;

  /** Timestamp of translation */
  readonly timestamp: number;

  /** Suggested cartouche orientation based on content */
  readonly suggestedOrientation: CartoucheOrientation;
}

/**
 * Configuration options for cartouche rendering.
 */
export interface CartoucheConfig {
  /** Display orientation */
  orientation: CartoucheOrientation;

  /** Whether to show the decorative border */
  showBorder: boolean;

  /** Whether to show corner decorations (ankh, scarab, etc.) */
  showDecorations: boolean;

  /** Maximum glyphs per row in horizontal mode */
  maxGlyphsPerRow: number;

  /** Padding around glyphs in pixels */
  padding: number;
}

// =============================================================================
// DEITY TYPES
// =============================================================================

/**
 * Egyptian deity representation for the learning section.
 * Contains comprehensive information about gods and goddesses.
 */
export interface IDeity {
  /** Unique identifier (e.g., "ra", "osiris") */
  readonly id: string;

  /** English name of the deity (e.g., "Ra") */
  readonly name: string;

  /** Original Egyptian name if different */
  readonly egyptianName: string;

  /** Greek equivalent name if applicable (e.g., "Helios") */
  readonly greekName?: string;

  /** Hieroglyph codes spelling the deity's name */
  readonly hieroglyphSpelling: readonly string[];

  /** Titles associated with the deity (e.g., ["Sun God", "Creator"]) */
  readonly titles: readonly string[];

  /** Domains the deity presides over (e.g., ["sun", "creation", "kingship"]) */
  readonly domains: readonly string[];

  /** Brief description of the deity */
  readonly description: string;

  /** Path to deity icon/image asset */
  readonly iconPath: string;

  /** Gardiner codes of glyphs associated with this deity */
  readonly associatedGlyphs: readonly string[];

  /** Extended mythology and stories */
  readonly mythology: string;

  /** Associated color for theming (hex value) */
  readonly color?: string;
}

// =============================================================================
// THEME TYPES
// =============================================================================

/**
 * Available theme modes.
 */
export type ThemeName = "light" | "dark";

/**
 * Theme mode (alias for ThemeName for compatibility).
 */
export type ThemeMode = ThemeName;

/**
 * Complete set of theme colors.
 * All values should be valid CSS color strings.
 */
export interface ThemeColors {
  /** Primary background color */
  readonly primaryBg: string;

  /** Secondary/alternate background color */
  readonly secondaryBg: string;

  /** Tertiary/elevated background color */
  readonly tertiaryBg: string;

  /** Primary text color */
  readonly textPrimary: string;

  /** Secondary/muted text color */
  readonly textSecondary: string;

  /** Subtle/disabled text color */
  readonly textMuted: string;

  /** Primary accent gold color */
  readonly accentGold: string;

  /** Light variant of accent gold */
  readonly accentGoldLight: string;

  /** Dark variant of accent gold */
  readonly accentGoldDark: string;

  /** Standard border color */
  readonly border: string;

  /** Subtle border color */
  readonly borderSubtle: string;

  /** Success state color */
  readonly success: string;

  /** Warning state color */
  readonly warning: string;

  /** Error state color */
  readonly error: string;
}

/**
 * Complete theme definition.
 */
export interface Theme {
  /** Theme identifier */
  readonly name: ThemeName;

  /** Human-readable theme name */
  readonly displayName: string;

  /** Color palette for this theme */
  readonly colors: ThemeColors;
}

/**
 * Theme configuration with extended color options.
 * Used for theme provider context.
 */
export interface ThemeConfig {
  /** Current theme mode */
  mode: ThemeMode;

  /** Color configuration */
  colors: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    accent: string;
    muted: string;
    border: string;
  };
}

// =============================================================================
// API TYPES
// =============================================================================

/**
 * Request body for POST /api/translate endpoint.
 */
export interface TranslateRequest {
  /** Text to translate to hieroglyphs */
  text: string;

  /** Optional translation configuration */
  options?: {
    /** Whether to preserve punctuation marks */
    preservePunctuation?: boolean;

    /** Maximum text length to process */
    maxLength?: number;

    /** Preferred cartouche orientation */
    orientation?: CartoucheOrientation;

    /** Whether to include alternative glyph matches */
    includeAlternatives?: boolean;

    /** Maximum number of alternative matches per token */
    maxResults?: number;
  };
}

/**
 * Response from POST /api/translate endpoint.
 */
export interface TranslateResponse {
  /** Whether the translation succeeded */
  success: boolean;

  /** Translation result (present if success is true) */
  result?: TranslationResult;

  /** Error message (present if success is false) */
  error?: string;
}

/**
 * Response from GET /api/glyphs endpoint.
 */
export interface GlyphsResponse {
  /** Array of glyph data */
  glyphs: IGlyph[];

  /** Total count of glyphs returned */
  total: number;

  /** List of categories represented in response */
  categories: GardinerCategory[];
}

/**
 * Filter options for glyph queries in the learning section.
 */
export interface GlyphFilter {
  /** Filter by Gardiner category */
  category?: GardinerCategory;

  /** Search term for name, phonetic, or code */
  searchTerm?: string;

  /** Filter to phonetic glyphs only */
  isPhonetic?: boolean;

  /** Filter to determinative glyphs only */
  isDeterminative?: boolean;

  /** Filter to commonly used glyphs only */
  isCommon?: boolean;
}

// =============================================================================
// EXPORT TYPES
// =============================================================================

/**
 * Available image export formats.
 */
export type ExportFormat = "png" | "svg" | "jpg" | "jpeg";

/**
 * Configuration options for cartouche image export.
 */
export interface ExportOptions {
  /** Output format */
  format: ExportFormat;

  /** Quality for lossy formats (0-1, where 1 is highest quality) */
  quality: number;

  /** Scale multiplier (1 = 1x, 2 = 2x/retina, etc.) */
  scale: number;

  /** Whether to include background in export */
  includeBackground: boolean;

  /** Background color if includeBackground is true */
  backgroundColor?: string;

  /** Whether to include the decorative frame */
  includeFrame?: boolean;

  /** Cartouche orientation for export */
  orientation?: CartoucheOrientation;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Phonetic mapping type for the translator.
 * Maps phonetic strings to arrays of possible glyphs.
 */
export type PhoneticMap = Map<string, IGlyph[]>;

/**
 * Ordered list of digraphs (checked before single letters).
 * Priority order matters - longer/more specific patterns first.
 */
export const DIGRAPHS = [
  "sh",  // ʃ sound - Maps to N37 (pool) for Egyptian š
  "ch",  // tʃ sound - Maps to Aa1 (placenta)
  "th",  // θ sound - Maps to D46 (hand) as approximation
  "kh",  // x sound - Maps to Aa1 (placenta) for Egyptian ḫ
  "ph",  // f sound - Maps to I9 (horned viper) for 'f'
  "aa",  // aː sound - Long a vowel
  "qu",  // kw sound - Maps to Q3 + G43 combination
  "oo",  // uː sound - Maps to G43 (quail chick)
  "ee",  // iː sound - Maps to M17 (reed) doubled
] as const;

/**
 * Type for the DIGRAPHS array elements.
 */
export type Digraph = typeof DIGRAPHS[number];

/**
 * Type guard to check if an unknown value is a valid IGlyph.
 *
 * @param obj - The value to check
 * @returns True if the value conforms to the IGlyph interface
 *
 * @example
 * ```typescript
 * const data = await fetchGlyph(id);
 * if (isGlyph(data)) {
 *   console.log(data.gardinerCode);
 * }
 * ```
 */
export function isGlyph(obj: unknown): obj is IGlyph {
  if (obj === null || typeof obj !== "object") {
    return false;
  }

  const glyph = obj as Record<string, unknown>;

  return (
    typeof glyph.id === "string" &&
    typeof glyph.gardinerCode === "string" &&
    typeof glyph.category === "string" &&
    Array.isArray(glyph.phoneticValue) &&
    typeof glyph.primaryPhonetic === "string" &&
    typeof glyph.name === "string" &&
    typeof glyph.description === "string" &&
    typeof glyph.svgPath === "string" &&
    typeof glyph.transliteration === "string" &&
    Array.isArray(glyph.tags) &&
    typeof glyph.isDeterminative === "boolean" &&
    typeof glyph.isPhonetic === "boolean" &&
    typeof glyph.isCommon === "boolean"
  );
}

/**
 * Type guard to check if an unknown value is a valid TranslationResult.
 *
 * @param obj - The value to check
 * @returns True if the value conforms to the TranslationResult interface
 *
 * @example
 * ```typescript
 * const response = await translateText("hello");
 * if (isTranslationResult(response.result)) {
 *   console.log(response.result.tokens);
 * }
 * ```
 */
export function isTranslationResult(obj: unknown): obj is TranslationResult {
  if (obj === null || typeof obj !== "object") {
    return false;
  }

  const result = obj as Record<string, unknown>;

  return (
    (typeof result.input === "string" || typeof result.originalText === "string") &&
    (typeof result.normalized === "string" || typeof result.normalizedText === "string") &&
    Array.isArray(result.tokens) &&
    Array.isArray(result.unknownCharacters) &&
    typeof result.successRate === "number" &&
    typeof result.timestamp === "number"
  );
}

/**
 * Type guard to check if a string is a valid GardinerCategory.
 *
 * @param value - The string to check
 * @returns True if the value is a valid Gardiner category
 */
export function isGardinerCategory(value: string): value is GardinerCategory {
  const validCategories: readonly string[] = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Aa"
  ];
  return validCategories.includes(value);
}

/**
 * Type guard to check if a string is a valid digraph.
 *
 * @param value - The string to check
 * @returns True if the value is a recognized digraph
 */
export function isDigraph(value: string): value is Digraph {
  return (DIGRAPHS as readonly string[]).includes(value);
}

/**
 * Type guard to check if a string is a valid theme name.
 *
 * @param value - The string to check
 * @returns True if the value is a valid theme name
 */
export function isThemeName(value: string): value is ThemeName {
  return value === "light" || value === "dark";
}

/**
 * Type guard to check if a string is a valid export format.
 *
 * @param value - The string to check
 * @returns True if the value is a valid export format
 */
export function isExportFormat(value: string): value is ExportFormat {
  return ["png", "svg", "jpg", "jpeg"].includes(value);
}

// =============================================================================
// COMPONENT PROP TYPES
// =============================================================================

/**
 * Size variants for UI components.
 */
export type ComponentSize = "sm" | "md" | "lg";

/**
 * Common props for glyph display components.
 */
export interface GlyphDisplayProps {
  /** The glyph token to display */
  token: GlyphToken;

  /** Size variant */
  size?: ComponentSize;

  /** Whether to show tooltip on hover */
  showTooltip?: boolean;

  /** Whether the component is interactive */
  isInteractive?: boolean;

  /** Click handler */
  onClick?: () => void;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for cartouche component.
 */
export interface CartoucheProps {
  /** Array of tokens to display */
  tokens: readonly GlyphToken[];

  /** Display orientation */
  orientation: CartoucheOrientation;

  /** Whether to show decorative frame */
  showFrame?: boolean;

  /** Additional CSS classes */
  className?: string;

  /** Handler for glyph clicks */
  onGlyphClick?: (token: GlyphToken) => void;
}

/**
 * Props for input area component.
 */
export interface InputAreaProps {
  /** Current input value */
  value: string;

  /** Change handler */
  onChange: (value: string) => void;

  /** Maximum character length */
  maxLength?: number;

  /** Placeholder text */
  placeholder?: string;

  /** Additional CSS classes */
  className?: string;

  /** Whether the input is disabled */
  disabled?: boolean;
}
