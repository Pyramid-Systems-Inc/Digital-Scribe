import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { toPng, toSvg } from 'html-to-image';
import Cartouche from './Cartouche';
import ShareButtons from './ShareButtons';
import type { GlyphType } from '../types';

// API Response interface
interface TranslationResponse {
  glyphs: {
    gardinerCode: string;
    unicode: string;
    phoneticValue: string;
    description: string;
    category: string;
  }[];
}

interface HieroglyphComposerProps {
  initialText?: string;
}

const HieroglyphComposer: React.FC<HieroglyphComposerProps> = ({ initialText = '' }) => {
  const [inputText, setInputText] = useState(initialText);
  const [glyphs, setGlyphs] = useState<GlyphType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cartoucheRef = useRef<HTMLDivElement>(null);

  // Set input text if initialText from URL changes
  useEffect(() => {
    setInputText(initialText);
  }, [initialText]);

  useEffect(() => {
    if (!inputText.trim()) {
      setGlyphs([]);
      setError(null);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.post<TranslationResponse>(
          'http://localhost:8080/api/v1/translate',
          { text: inputText }
        );
        const mappedGlyphs: GlyphType[] = response.data.glyphs.map((glyph, index) => ({
          id: `${glyph.gardinerCode}-${index}`,
          gardinerCode: glyph.gardinerCode,
          unicode: glyph.unicode,
          phoneticValue: glyph.phoneticValue,
          description: glyph.description,
          category: glyph.category,
        }));
        setGlyphs(mappedGlyphs);
      } catch (err) {
        console.error('Translation API error:', err);
        setError('Failed to translate text. Please try again.');
        setGlyphs([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputText]);

  const handleDownload = useCallback((format: 'png' | 'svg') => {
    if (!cartoucheRef.current) {
      console.error('Cartouche reference is not available.');
      return;
    }
    const exporter = format === 'png' ? toPng : toSvg;
    exporter(cartoucheRef.current, { cacheBust: true, backgroundColor: '#f0e6d2' })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `digital-scribe-cartouche.${format}`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Failed to generate image', err);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 p-4 sm:p-0" id="composer">
      <div className="text-center papyrus-bg rounded-lg p-4 sm:p-6 md:p-8 shadow-papyrus">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold nile-blue mb-3 sm:mb-4 text-shadow-gold">
          Hieroglyph Composer
        </h2>
        <p className="text-base sm:text-lg hieroglyph-brown font-serif leading-relaxed max-w-2xl mx-auto">
          Enter your text below and watch as ancient Egyptian scribes would have written it in sacred hieroglyphs.
        </p>
      </div>
      
      <div className="papyrus-bg rounded-lg p-4 sm:p-6 shadow-papyrus space-y-4">
        <label htmlFor="text-input" className="block text-base sm:text-lg font-display font-semibold nile-blue mb-2">
          Your Message
        </label>
        <input
          id="text-input"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to translate..."
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg font-serif hieroglyph-brown bg-white/80 border-2 border-gold/30 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-200 placeholder:text-hieroglyph-brown/50"
        />
        
        {isLoading && (
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 py-3 sm:py-4">
            <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-2 border-gold border-t-transparent"></div>
            <span className="text-gold font-sans font-medium text-sm sm:text-base">Translating...</span>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 sm:p-4 text-red-700 font-sans font-medium text-sm sm:text-base">
            {error}
          </div>
        )}
      </div>

      <div ref={cartoucheRef} className="papyrus-bg rounded-lg p-3 sm:p-4 md:p-6 shadow-papyrus">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-xl sm:text-2xl font-display font-semibold nile-blue">
            Royal Cartouche
          </h3>
          {glyphs.length > 0 && (
            <span className="bg-gold text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-sans font-medium">
              {glyphs.length} {glyphs.length === 1 ? 'Symbol' : 'Symbols'}
            </span>
          )}
        </div>
        <Cartouche glyphs={glyphs} />
      </div>

      {glyphs.length > 0 && !error && (
        <div className="papyrus-bg rounded-lg p-4 shadow-papyrus">
          <ShareButtons
            textToShare={inputText}
            onDownloadPNG={() => handleDownload('png')}
            onDownloadSVG={() => handleDownload('svg')}
          />
        </div>
      )}
    </div>
  );
};

export default HieroglyphComposer;