import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define GlyphType interface based on the backend glyph structure
interface GlyphType {
  glyphId: string;
  unicode: string;
  phoneticValue: string;
  description: string;
  category: string;
  imageUrl: string;
}

// API Response interface
interface TranslationResponse {
  originalText: string;
  sanitizedText: string;
  glyphs: GlyphType[];
  count: number;
}

const HieroglyphComposer: React.FC = () => {
  // State for input text
  const [inputText, setInputText] = useState('');
  // State for resulting glyphs
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
        
        // Update glyphs state with response data
        setGlyphs(response.data.glyphs);
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
    <div className="max-w-4xl mx-auto space-y-8" id="composer">
      {/* Composer Header */}
      <div className="text-center papyrus-bg rounded-lg p-8 shadow-papyrus">
        <h2 className="text-4xl md:text-5xl font-display font-bold nile-blue mb-4 text-shadow-gold">
          Hieroglyph Composer
        </h2>
        <p className="text-lg hieroglyph-brown font-serif leading-relaxed max-w-2xl mx-auto">
          Enter your text below and watch as ancient Egyptian scribes would have written it in sacred hieroglyphs
        </p>
      </div>
      
      {/* Input Section */}
      <div className="papyrus-bg rounded-lg p-6 shadow-papyrus space-y-4">
        <label htmlFor="text-input" className="block text-lg font-display font-semibold nile-blue mb-2">
          Your Message
        </label>
        <input
          id="text-input"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to translate into hieroglyphs..."
          className="w-full px-4 py-3 text-lg font-serif hieroglyph-brown bg-white/80 border-2 border-gold/30 rounded-lg shadow-inner focus:outline-hidden focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-200 placeholder:text-hieroglyph-brown/50"
        />
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center space-x-3 py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-gold border-t-transparent"></div>
            <span className="text-gold font-sans font-medium">Translating ancient wisdom...</span>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-700 font-sans font-medium">{error}</span>
            </div>
          </div>
        )}
      </div>

      {/* Glyphs Display */}
      <div className="space-y-6">
        {glyphs.length > 0 && (
          <>
            <div className="papyrus-bg rounded-lg p-6 shadow-papyrus">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-display font-semibold nile-blue">
                  Sacred Hieroglyphs
                </h3>
                <span className="bg-gold text-white px-3 py-1 rounded-full text-sm font-sans font-medium">
                  {glyphs.length} {glyphs.length === 1 ? 'glyph' : 'glyphs'}
                </span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {glyphs.map((glyph, index) => (
                  <div
                    key={`${index}-${glyph.glyphId}`}
                    className="bg-white/60 rounded-lg p-4 shadow-sm hover:shadow-gold hover:scale-105 transition-all duration-200 border border-gold/20 group"
                  >
                    <div className="aspect-square mb-3 flex items-center justify-center bg-white/80 rounded-lg p-2">
                      <img
                        src={glyph.imageUrl}
                        alt={glyph.description}
                        className="max-w-full max-h-full object-contain filter group-hover:brightness-110 transition-all duration-200"
                        title={`${glyph.phoneticValue} - ${glyph.description}`}
                      />
                    </div>
                    <div className="text-center space-y-1">
                      <div className="font-sans font-bold text-sm hieroglyph-brown bg-gold/10 rounded px-2 py-1">
                        {glyph.phoneticValue}
                      </div>
                      <div className="text-xs hieroglyph-brown/70 font-serif leading-tight">
                        {glyph.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        
        {/* No Results State */}
        {!isLoading && inputText.trim() && glyphs.length === 0 && !error && (
          <div className="papyrus-bg rounded-lg p-8 text-center shadow-papyrus">
            <div className="w-16 h-16 mx-auto mb-4 bg-gold/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-display font-semibold nile-blue mb-2">
              No Hieroglyphs Found
            </h3>
            <p className="hieroglyph-brown font-serif">
              The ancient scribes have not yet learned to write "<span className="font-semibold">{inputText}</span>".
              Try simpler words or common phrases.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HieroglyphComposer;