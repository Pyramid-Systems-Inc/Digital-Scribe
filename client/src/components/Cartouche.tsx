import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import type { GlyphType } from '../types';
import Glyph from './Glyph';

interface CartoucheProps {
  glyphs: GlyphType[];
}

const Cartouche: React.FC<CartoucheProps> = ({ glyphs }) => {
  // Empty State
  if (!glyphs || glyphs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gold/30 rounded-full bg-papyrus-light/30 p-6 text-center">
        <span className="text-4xl mb-2 opacity-50">𓍹 𓍺</span>
        <p className="text-hieroglyph-brown/60 font-serif italic">
          The cartouche awaits your name...
        </p>
      </div>
    );
  }

  // Dynamic height calculation based on glyph count to ensure they fit nicely
  // The Cartouche stretches vertically as the list grows
  let heightClass = "h-48 sm:h-56"; // Default
  if (glyphs.length > 6) heightClass = "h-64 sm:h-72";
  if (glyphs.length > 12) heightClass = "h-80 sm:h-96";
  if (glyphs.length > 20) heightClass = "h-[28rem] sm:h-[32rem]";

  return (
    <div className={`relative w-full max-w-2xl mx-auto transition-all duration-500 ${heightClass} my-4 filter drop-shadow-xl`}>
      <svg
        viewBox="0 0 320 120"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        preserveAspectRatio="none" // Allow stretching to fit container
      >
        <defs>
          {/* Metallic Gold Gradient */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B8860B" />
            <stop offset="25%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FDB931" />
            <stop offset="75%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>

          {/* Deep Nile Blue (Lapis) Gradient */}
          <linearGradient id="lapisGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>

          {/* Inner Shadow Filter for Depth */}
          <filter id="insetShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feComponentTransfer in="SourceAlpha">
              <feFuncA type="table" tableValues="1 0" />
            </feComponentTransfer>
            <feGaussianBlur stdDeviation="3" />
            <feOffset dx="0" dy="2" result="offsetblur" />
            <feFlood floodColor="rgb(69, 26, 3)" floodOpacity="0.3" />
            <feComposite in2="offsetblur" operator="in" />
            <feComposite in2="SourceAlpha" operator="in" />
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode />
            </feMerge>
          </filter>

          {/* Papyrus Pattern Reference */}
          <pattern id="papyrus-fill" patternUnits="userSpaceOnUse" width="100%" height="100%">
            <image href="/papyrus-texture.png" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" opacity="0.5" />
          </pattern>
        </defs>

        {/* --- The Cartouche Frame --- */}

        {/* Background Fill (Papyrus Texture) */}
        <path
          d="M 35 15 Q 15 15 15 35 L 15 85 Q 15 105 35 105 L 265 105 Q 285 105 285 85 L 285 35 Q 285 15 265 15 Z"
          fill="url(#papyrus-fill)"
          className="opacity-90"
        />

        {/* Outer Gold Border */}
        <path
          d="M 35 12 Q 12 12 12 35 L 12 85 Q 12 108 35 108 L 265 108 Q 288 108 288 85 L 288 35 Q 288 12 265 12 Z"
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth="4"
          filter="url(#insetShadow)"
        />

        {/* Inner Thin Blue Border for contrast */}
        <path
          d="M 35 16 Q 16 16 16 35 L 16 85 Q 16 104 35 104 L 265 104 Q 284 104 284 85 L 284 35 Q 284 16 265 16 Z"
          fill="none"
          stroke="#1e3a8a"
          strokeWidth="1"
          opacity="0.6"
        />

        {/* --- The Rope Tie (The 'Shen' knot base) --- */}
        <g transform="translate(286, 10)">
          {/* Vertical Bar */}
          <rect x="0" y="0" width="12" height="100" rx="2" ry="2" fill="url(#goldGradient)" stroke="#92400e" strokeWidth="0.5" />
          {/* Horizontal Bindings */}
          <line x1="0" y1="15" x2="12" y2="15" stroke="#92400e" strokeWidth="0.5" />
          <line x1="0" y1="25" x2="12" y2="25" stroke="#92400e" strokeWidth="0.5" />
          <line x1="0" y1="85" x2="12" y2="85" stroke="#92400e" strokeWidth="0.5" />
          <line x1="0" y1="75" x2="12" y2="75" stroke="#92400e" strokeWidth="0.5" />
        </g>

        {/* --- Glyphs Container --- */}
        <foreignObject x="30" y="20" width="240" height="80">
          <div
            className="w-full h-full flex flex-wrap items-center justify-center content-center gap-1 sm:gap-2 overflow-hidden px-4"
            style={{
              direction: 'ltr', // Ensure glyphs read left-to-right as intended for this app
            }}
          >
            <AnimatePresence mode="popLayout">
              {glyphs.map((glyph) => (
                <motion.div
                  key={glyph.id}
                  initial={{ opacity: 0, scale: 0, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    mass: 0.5
                  }}
                  layout
                >
                  <Glyph glyph={glyph} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

export default Cartouche;