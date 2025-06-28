import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      <svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
        <defs>
          <style>
            {`
        .cartouche-fill { fill: #f9f7f0; }
        .cartouche-stroke { stroke: #003366; stroke-width: 2; fill: none; } /* Nile Blue */
        .inner-stroke { stroke: #003366; stroke-width: 1; fill: none; } /* Nile Blue */
        .hieroglyph { fill: #FFD700; stroke: #003366; stroke-width: 0.5; } /* Gold fill, Nile Blue stroke */
      `}
          </style>
          <pattern id="papyrus-texture" patternUnits="userSpaceOnUse" width="100%" height="100%">
            <image href="/papyrus-texture.png" x="0" y="0" width="320" height="120" preserveAspectRatio="none" />
          </pattern>
        </defs>
        
        {/* Main cartouche body - outer border */}
        <path
          d="M 35 15
       Q 15 15 15 35
       L 15 85
       Q 15 105 35 105
       L 265 105
       Q 285 105 285 85
       L 285 35
       Q 285 15 265 15
       Z"
          className="cartouche-stroke"
          fill="#FFD700"
        />
  
        {/* Main cartouche body - inner border */}
        <path
          d="M 35 22
       Q 22 22 22 35
       L 22 85
       Q 22 98 35 98
       L 265 98
       Q 278 98 278 85
       L 278 35
       Q 278 22 265 22
       Z"
          className="inner-stroke"
          fill="url(#papyrus-texture)"
        />
  
        {/* Rope tie section - outer */}
        <rect x="290" y="15" width="15" height="90" rx="7" ry="7" className="cartouche-fill cartouche-stroke"/>
  
        {/* Rope tie section - inner */}
        <rect x="292" y="22" width="11" height="76" rx="5" ry="5" className="inner-stroke"/>
  
        {/* Top hieroglyphic border */}
        <g className="hieroglyph" fontFamily="serif" fontSize="4" textAnchor="middle" dominantBaseline="middle">
          <text x="31.5" y="18.5">𓀀</text>
          <text x="37.5" y="18.5">𓂀</text>
          <text x="43.5" y="18.5">𓃀</text>
          <text x="49.5" y="18.5">𓀁</text>
          <text x="55.5" y="18.5">𓂁</text>
          <text x="61.5" y="18.5">𓃁</text>
          <text x="67.5" y="18.5">𓀂</text>
          <text x="73.5" y="18.5">𓂂</text>
          <text x="79.5" y="18.5">𓃂</text>
          <text x="85.5" y="18.5">𓀃</text>
          <text x="91.5" y="18.5">𓂃</text>
          <text x="97.5" y="18.5">𓃃</text>
          <text x="103.5" y="18.5">𓀄</text>
          <text x="109.5" y="18.5">𓂄</text>
          <text x="115.5" y="18.5">𓃄</text>
          <text x="121.5" y="18.5">𓀅</text>
          <text x="127.5" y="18.5">𓂅</text>
          <text x="133.5" y="18.5">𓃅</text>
          <text x="139.5" y="18.5">𓀆</text>
          <text x="145.5" y="18.5">𓂆</text>
          <text x="151.5" y="18.5">𓃆</text>
          <text x="157.5" y="18.5">𓀇</text>
          <text x="163.5" y="18.5">𓂇</text>
          <text x="169.5" y="18.5">𓃇</text>
          <text x="175.5" y="18.5">𓀈</text>
          <text x="181.5" y="18.5">𓂈</text>
          <text x="187.5" y="18.5">𓃈</text>
          <text x="193.5" y="18.5">𓀉</text>
          <text x="199.5" y="18.5">𓂉</text>
          <text x="205.5" y="18.5">𓃉</text>
          <text x="211.5" y="18.5">𓀊</text>
          <text x="217.5" y="18.5">𓂊</text>
          <text x="223.5" y="18.5">𓃊</text>
          <text x="229.5" y="18.5">𓀋</text>
          <text x="235.5" y="18.5">𓂋</text>
          <text x="241.5" y="18.5">𓃋</text>
          <text x="247.5" y="18.5">𓀌</text>
          <text x="253.5" y="18.5">𓂌</text>
          <text x="259.5" y="18.5">𓃌</text>
          <text x="265.5" y="18.5">𓀍</text>
          <text x="271.5" y="18.5">𓂍</text>
        </g>
  
        {/* Bottom hieroglyphic border */}
        <g className="hieroglyph" fontFamily="serif" fontSize="4" textAnchor="middle" dominantBaseline="middle">
          <text x="31.5" y="101.5">𓃍</text>
          <text x="37.5" y="101.5">𓂎</text>
          <text x="43.5" y="101.5">𓃎</text>
          <text x="49.5" y="101.5">𓀎</text>
          <text x="55.5" y="101.5">𓂏</text>
          <text x="61.5" y="101.5">𓃏</text>
          <text x="67.5" y="101.5">𓀏</text>
          <text x="73.5" y="101.5">𓂐</text>
          <text x="79.5" y="101.5">𓃐</text>
          <text x="85.5" y="101.5">𓀐</text>
          <text x="91.5" y="101.5">𓂑</text>
          <text x="97.5" y="101.5">𓃑</text>
          <text x="103.5" y="101.5">𓀑</text>
          <text x="109.5" y="101.5">𓂒</text>
          <text x="115.5" y="101.5">𓃒</text>
          <text x="121.5" y="101.5">𓀒</text>
          <text x="127.5" y="101.5">𓂓</text>
          <text x="133.5" y="101.5">𓃓</text>
          <text x="139.5" y="101.5">𓀓</text>
          <text x="145.5" y="101.5">𓂔</text>
          <text x="151.5" y="101.5">𓃔</text>
          <text x="157.5" y="101.5">𓀔</text>
          <text x="163.5" y="101.5">𓂕</text>
          <text x="169.5" y="101.5">𓃕</text>
          <text x="175.5" y="101.5">𓀕</text>
          <text x="181.5" y="101.5">𓂖</text>
          <text x="187.5" y="101.5">𓃖</text>
          <text x="193.5" y="101.5">𓀖</text>
          <text x="199.5" y="101.5">𓂗</text>
          <text x="205.5" y="101.5">𓃗</text>
          <text x="211.5" y="101.5">𓀗</text>
          <text x="217.5" y="101.5">𓂘</text>
          <text x="223.5" y="101.5">𓃘</text>
          <text x="229.5" y="101.5">𓀘</text>
          <text x="235.5" y="101.5">𓂙</text>
          <text x="241.5" y="101.5">𓃙</text>
          <text x="247.5" y="101.5">𓀙</text>
          <text x="253.5" y="101.5">𓂚</text>
          <text x="259.5" y="101.5">𓃚</text>
          <text x="265.5" y="101.5">𓀚</text>
          <text x="271.5" y="101.5">𓂛</text>
        </g>
  
        {/* Left hieroglyphic border */}
        <g className="hieroglyph" fontFamily="serif" fontSize="4" textAnchor="middle" dominantBaseline="middle">
          <text x="18.5" y="31.5">𓃛</text>
          <text x="18.5" y="37.5">𓂜</text>
          <text x="18.5" y="43.5">𓃜</text>
          <text x="18.5" y="49.5">𓀜</text>
          <text x="18.5" y="55.5">𓂝</text>
          <text x="18.5" y="61.5">𓃝</text>
          <text x="18.5" y="67.5">𓀝</text>
          <text x="18.5" y="73.5">𓂞</text>
          <text x="18.5" y="79.5">𓃞</text>
          <text x="18.5" y="85.5">𓀞</text>
          <text x="18.5" y="91.5">𓂟</text>
        </g>
  
        {/* Right hieroglyphic border */}
        <g className="hieroglyph" fontFamily="serif" fontSize="4" textAnchor="middle" dominantBaseline="middle">
          <text x="281.5" y="31.5">𓃟</text>
          <text x="281.5" y="37.5">𓂠</text>
          <text x="281.5" y="43.5">𓃠</text>
          <text x="281.5" y="49.5">𓀠</text>
          <text x="281.5" y="55.5">𓂡</text>
          <text x="281.5" y="61.5">𓃡</text>
          <text x="281.5" y="67.5">𓀡</text>
          <text x="281.5" y="73.5">𓂢</text>
          <text x="281.5" y="79.5">𓃢</text>
          <text x="281.5" y="85.5">𓀢</text>
          <text x="281.5" y="91.5">𓂣</text>
        </g>
  
        {/* Rope tie hieroglyphic pattern */}
        <g className="hieroglyph" fontFamily="serif" fontSize="3" textAnchor="middle" dominantBaseline="middle">
          <text x="295.5" y="18.5">𓃣</text>
          <text x="300.5" y="18.5">𓂤</text>
          <text x="295.5" y="25.5">𓃤</text>
          <text x="300.5" y="25.5">𓀤</text>
          <text x="295.5" y="32.5">𓂥</text>
          <text x="300.5" y="32.5">𓃥</text>
          <text x="295.5" y="39.5">𓀥</text>
          <text x="300.5" y="39.5">𓂦</text>
          <text x="295.5" y="46.5">𓃦</text>
          <text x="300.5" y="46.5">𓀦</text>
          <text x="295.5" y="53.5">𓂧</text>
          <text x="300.5" y="53.5">𓃧</text>
          <text x="295.5" y="60.5">𓀧</text>
          <text x="300.5" y="60.5">𓂨</text>
          <text x="295.5" y="67.5">𓃨</text>
          <text x="300.5" y="67.5">𓀨</text>
          <text x="295.5" y="74.5">𓂩</text>
          <text x="300.5" y="74.5">𓃩</text>
          <text x="295.5" y="81.5">𓀩</text>
          <text x="300.5" y="81.5">𓂪</text>
          <text x="295.5" y="88.5">𓃪</text>
          <text x="300.5" y="88.5">𓀪</text>
          <text x="295.5" y="95.5">𓂫</text>
          <text x="300.5" y="95.5">𓃫</text>
          <text x="295.5" y="101.5">𓀫</text>
          <text x="300.5" y="101.5">𓂬</text>
        </g>
        {/* Glyphs container: Using foreignObject to embed HTML inside SVG */}
        <foreignObject x="30" y="30" width="240" height="60">
          <div
            className="w-full h-full flex flex-wrap items-center justify-center gap-1 p-1 overflow-y-auto text-[#FFD700]"
          >
            <AnimatePresence>
              {glyphs.map((glyph) => (
                <motion.div
                  key={glyph.id || glyph.gardinerCode}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
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
