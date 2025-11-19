import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { toPng, toSvg } from 'html-to-image';
import { motion, AnimatePresence } from 'framer-motion';
import Cartouche from './Cartouche';
import ShareButtons from './ShareButtons';
import type { GlyphType } from '../types';

// API Response interface
interface TranslationResponse {
  glyphs: {
    glyphId: string;
    gardinerCode: string; // Added for compatibility
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
    if (initialText) setInputText(initialText);
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
          id: `${glyph.glyphId || glyph.gardinerCode}-${index}`,
          gardinerCode: glyph.gardinerCode || glyph.glyphId, // Fallback for safety
          unicode: glyph.unicode,
          phoneticValue: glyph.phoneticValue,
          description: glyph.description,
          category: glyph.category,
        }));
        setGlyphs(mappedGlyphs);
      } catch (err) {
        console.error('Translation API error:', err);
        setError('The scribes could not translate this text. Please try again.');
        setGlyphs([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputText]);

  const handleDownload = useCallback((format: 'png' | 'svg') => {
    if (!cartoucheRef.current) return;
    
    const exporter = format === 'png' ? toPng : toSvg;
    // Use a papyrus color background for the export
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-4xl mx-auto space-y-8 sm:space-y-10 p-4 sm:p-0 relative z-10" 
      id="composer"
    >
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-gold-gradient drop-shadow-sm">
          Hieroglyph Composer
        </h2>
        <p className="text-lg sm:text-xl text-hieroglyph-brown/80 font-serif italic max-w-2xl mx-auto">
          "To speak the name of the dead is to make them live again."
        </p>
      </div>
      
      {/* Input Card */}
      <div className="card-ancient p-6 sm:p-8 md:p-10 relative overflow-hidden">
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold/30 rounded-tl-xl"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gold/30 rounded-tr-xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-gold/30 rounded-bl-xl"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold/30 rounded-br-xl"></div>

        <label htmlFor="text-input" className="block text-lg sm:text-xl font-display font-bold text-nile-blue mb-3 ml-1">
          Enter Your Name or Message
        </label>
        
        <div className="relative group">
          <input
            id="text-input"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type here to translate..."
            className="input-scribe shadow-inner"
            autoComplete="off"
          />
          
          {/* Loading Spinner positioned inside input */}
          <AnimatePresence>
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 text-red-800 bg-red-100/50 border border-red-200 px-4 py-2 rounded-lg font-serif text-sm"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Result Area */}
      <AnimatePresence mode="wait">
        <motion.div 
          layout
          className="card-ancient p-4 sm:p-6 md:p-8 relative"
          ref={cartoucheRef}
        >
          <div className="flex items-center justify-between mb-6 border-b border-hieroglyph-brown/10 pb-4">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-nile-blue flex items-center gap-3">
              <span className="text-gold text-4xl">𓍹</span>
              Royal Cartouche
              <span className="text-gold text-4xl">𓍺</span>
            </h3>
            
            <div className="flex items-center gap-2">
              {glyphs.length > 0 ? (
                 <span className="bg-gold/10 text-gold-dark px-3 py-1 rounded-full text-xs sm:text-sm font-bold font-sans border border-gold/20 shadow-sm">
                  {glyphs.length} {glyphs.length === 1 ? 'Symbol' : 'Symbols'}
                </span>
              ) : (
                <span className="text-hieroglyph-brown/50 text-sm font-serif italic">
                  Waiting for input...
                </span>
              )}
            </div>
          </div>

          <div className="min-h-[160px] flex items-center justify-center">
             <Cartouche glyphs={glyphs} />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Share Actions */}
      {glyphs.length > 0 && !error && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-ancient p-6"
        >
          <ShareButtons
            textToShare={inputText}
            onDownloadPNG={() => handleDownload('png')}
            onDownloadSVG={() => handleDownload('svg')}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default HieroglyphComposer;