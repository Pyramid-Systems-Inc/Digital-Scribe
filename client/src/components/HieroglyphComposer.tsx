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
    <div className="hieroglyph-composer">
      <div className="composer-header">
        <h1>Digital Scribe</h1>
        <p>Type text to see it translated into hieroglyphs</p>
      </div>
      
      <div className="input-section">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to translate..."
          className="text-input"
        />
        {isLoading && <div className="loading-indicator">Translating...</div>}
        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="glyphs-display">
        {glyphs.length > 0 && (
          <>
            <h2>Hieroglyphs ({glyphs.length})</h2>
            <div className="glyphs-container">
              {glyphs.map((glyph, index) => (
                <div key={`${index}-${glyph.glyphId}`} className="glyph-item">
                  <img
                    src={glyph.imageUrl}
                    alt={glyph.description}
                    className="glyph-image"
                    title={`${glyph.phoneticValue} - ${glyph.description}`}
                  />
                  <div className="glyph-info">
                    <span className="phonetic-value">{glyph.phoneticValue}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        
        {!isLoading && inputText.trim() && glyphs.length === 0 && !error && (
          <div className="no-results">No hieroglyphs found for this text.</div>
        )}
      </div>
    </div>
  );
};

export default HieroglyphComposer;