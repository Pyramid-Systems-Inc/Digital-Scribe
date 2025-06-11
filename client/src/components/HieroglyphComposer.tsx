import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cartouche from './Cartouche'; // Import the Cartouche component
import type { GlyphType } from '../types'; // Use shared GlyphType

// API Response interface for backend structure
interface BackendGlyphType {
  glyphId: string;
  unicode: string;
  phoneticValue: string;
  description: string;
  category: string;
  imageUrl: string; // This comes from backend but Glyph.tsx uses gardinerCode
}

interface TranslationResponse {
  originalText: string;
  sanitizedText: string;
  glyphs: BackendGlyphType[]; // Use BackendGlyphType for the raw response
  count: number;
}

const HieroglyphComposer: React.FC = () => {
  // State for input text
  const [inputText, setInputText] = useState('');
  // State for resulting glyphs, now using the shared GlyphType
  const [glyphs, setGlyphs] = useState<GlyphType[]>([]);
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  // Error state
  const [error, setError] = useState<string | null>(null);

  // Debounced API calls using useEffect
  useEffect(() => {
    // Don't make API calls for empty input
    if (!inputText.trim()) {
      setGlyphs([]);
      setError(null);
      return;
    }

    // Implement debounce mechanism with 300ms delay
    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Make API call to backend
        const response = await axios.post<TranslationResponse>(
          'http://localhost:8080/api/v1/translate',
          { text: inputText }
        );
        
        // Map backend glyphs to the shared GlyphType
        const mappedGlyphs: GlyphType[] = response.data.glyphs.map(glyph => ({
          id: glyph.glyphId, // Map glyphId to id
          gardinerCode: glyph.glyphId, // Assuming glyphId is the Gardiner code for image path
          unicode: glyph.unicode,
          phoneticValue: glyph.phoneticValue,
          description: glyph.description,
          category: glyph.category,
          // imageUrl from backend is not directly used by Glyph.tsx if it constructs from gardinerCode
        }));
        setGlyphs(mappedGlyphs);
      } catch (err) {
        // Basic error handling
        console.error('Translation API error:', err);
        setError('Failed to translate text. Please try again.');
        setGlyphs([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    // Clear existing timeout on each change to prevent excessive requests
    return () => clearTimeout(timeoutId);
  }, [inputText]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 p-4 sm:p-0" id="composer">
      {/* Composer Header */}
      <div className="text-center papyrus-bg rounded-lg p-4 sm:p-6 md:p-8 shadow-papyrus">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold nile-blue mb-3 sm:mb-4 text-shadow-gold">
          Hieroglyph Composer
        </h2>
        <p className="text-base sm:text-lg hieroglyph-brown font-serif leading-relaxed max-w-2xl mx-auto">
          Enter your text below and watch as ancient Egyptian scribes would have written it in sacred hieroglyphs
        </p>
      </div>
      
      {/* Input Section */}
      <div className="papyrus-bg rounded-lg p-4 sm:p-6 shadow-papyrus space-y-4">
        <label htmlFor="text-input" className="block text-base sm:text-lg font-display font-semibold nile-blue mb-2">
          Your Message
        </label>
        <input
          id="text-input"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to translate into hieroglyphs..."
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg font-serif hieroglyph-brown bg-white/80 border-2 border-gold/30 rounded-lg shadow-inner focus:outline-hidden focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-200 placeholder:text-hieroglyph-brown/50"
        />
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 py-3 sm:py-4">
            <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-2 border-gold border-t-transparent"></div>
            <span className="text-gold font-sans font-medium text-sm sm:text-base">Translating ancient wisdom...</span>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-700 font-sans font-medium text-sm sm:text-base">{error}</span>
            </div>
          </div>
        )}
      </div>

      {/* Glyphs Display using Cartouche Component */}
      <div className="space-y-4 sm:space-y-6">
        {/* Show Cartouche if there are glyphs and no error */}
        {glyphs.length > 0 && !error && (
          <div className="papyrus-bg rounded-lg p-3 sm:p-4 md:p-6 shadow-papyrus">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-xl sm:text-2xl font-display font-semibold nile-blue">
                Royal Cartouche
              </h3>
              <span className="bg-gold text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-sans font-medium">
                {glyphs.length} {glyphs.length === 1 ? 'Symbol' : 'Symbols'}
              </span>
            </div>
            <Cartouche glyphs={glyphs} />
          </div>
        )}

        {/* Empty Cartouche placeholder if input is present, no glyphs, no loading, no error */}
        {inputText.trim() && glyphs.length === 0 && !isLoading && !error && (
           <Cartouche glyphs={[]} /> // Render empty cartouche for "no results" state
        )}

        {/* Initial empty state (no input yet, or input cleared) */}
        {!inputText.trim() && !isLoading && !error && glyphs.length === 0 && (
           <Cartouche glyphs={[]} /> // Render empty cartouche for initial state
        )}
        
        {/* No Results State - This specific message might be redundant if Cartouche handles its empty state well,
            but keeping it for now for clarity during transition.
            The Cartouche component itself shows "No glyphs to display..." or "The cartouche awaits..."
            So, the specific "No Hieroglyphs Found" block below might only be needed if we want a more elaborate message
            than what the Cartouche provides for its empty state when an active search yielded no results.
         */}
        {/* Retaining the specific "No Hieroglyphs Found" message for when a search yields no results,
            as it provides more context than the generic empty cartouche.
            This will show if there's input, no loading, no glyphs, and no error.
            The Cartouche component will show its own "awaiting symbols" message if there's no input text yet.
        */}
        {!isLoading && inputText.trim() && glyphs.length === 0 && !error && (
          <div className="papyrus-bg rounded-lg p-4 sm:p-6 md:p-8 text-center shadow-papyrus">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gold/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-display font-semibold nile-blue mb-2">
              No Hieroglyphs Found for "{inputText}"
            </h3>
            <p className="hieroglyph-brown font-serif text-sm sm:text-base">
              The ancient scribes have not yet learned to write this. Try simpler words or common phrases.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HieroglyphComposer;