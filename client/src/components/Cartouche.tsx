import React from 'react';
import type { GlyphType } from '../types'; // Use shared GlyphType
import Glyph from './Glyph'; // Import the new Glyph component

interface CartoucheProps {
  glyphs: GlyphType[];
}

const Cartouche: React.FC<CartoucheProps> = ({ glyphs }) => {
  if (!glyphs || glyphs.length === 0) {
    return (
      <div className="flex items-center justify-center w-full min-h-[8rem] sm:min-h-[10rem] md:min-h-[12rem] h-32 sm:h-40 md:h-48 border-2 border-dashed border-gray-400 rounded-lg papyrus-bg my-4 p-4 text-center">
        <p className="text-hieroglyph-brown font-serif text-sm sm:text-base">The cartouche awaits its sacred symbols.</p>
      </div>
    );
  }

  // Determine container height based on number of glyphs to allow for some scaling
  // Responsive height classes: sm, md, lg for different screen sizes and glyph counts
  let cartoucheHeightClass = "h-40 sm:h-48 md:h-56 lg:h-64"; // Base for up to 5 glyphs
  if (glyphs.length > 5 && glyphs.length <= 10) {
    cartoucheHeightClass = "h-56 sm:h-64 md:h-72 lg:h-80";
  } else if (glyphs.length > 10) {
    cartoucheHeightClass = "h-64 sm:h-72 md:h-80 lg:h-96";
  }


  return (
    <div className={`relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl mx-auto p-1 sm:p-2 ${cartoucheHeightClass} my-4`}>
      {/* SVG Cartouche Outline will go here */}
      <svg
        viewBox="0 0 320 120" // This viewBox defines the aspect ratio of the SVG canvas
        className="absolute inset-0 w-full h-full z-0"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet" // Ensures the SVG scales to fit its container
      >
         <path
          d="M 30 15 Q 10 15, 10 35 L 10 85 Q 10 105, 30 105 L 270 105 Q 290 105, 290 85 L 290 35 Q 290 15, 270 15 Z
             M 270 15 L 310 15 L 310 105 L 270 105 Z"
          className="fill-papyrus-bg stroke-nileBlue" // Using papyrus-bg for semi-transparent fill
          strokeWidth="3"
        />
      </svg>

      {/* Glyphs container: Using Flexbox for centering and wrapping */}
      <div className="relative z-10 flex flex-wrap items-center justify-center h-full gap-x-1 sm:gap-x-2 gap-y-1 sm:gap-y-2 md:gap-y-3 p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto">
        {glyphs.map((glyph) => (
          // Use the new Glyph component
          // Ensure the key is unique, using glyph.id (as per updated GlyphType)
          // or glyph.gardinerCode if id is not guaranteed unique here yet.
          // For now, assuming glyph.id will be the standard.
          <Glyph key={glyph.id || glyph.gardinerCode} glyph={glyph} />
        ))}
      </div>
    </div>
  );
};

export default Cartouche;