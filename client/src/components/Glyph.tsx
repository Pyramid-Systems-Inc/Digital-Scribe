import React, { useState } from 'react';
import type { GlyphType } from '../types.ts'; // Use type-only import and add .ts extension
import Tooltip from './Tooltip.tsx'; // Add .tsx extension

interface GlyphProps {
  glyph: GlyphType;
}

const Glyph: React.FC<GlyphProps> = ({ glyph }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="relative inline-block m-1"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={`/glyphs/${glyph.gardinerCode}.svg`}
        alt={glyph.description || glyph.phoneticValue || glyph.gardinerCode}
        className="h-12 w-12 object-contain" // Example styling, adjust as needed
      />
      {isHovered && (
        <Tooltip
          title={glyph.phoneticValue || 'N/A'}
          description={glyph.description || 'No description available.'}
          category={glyph.category || 'Unknown'}
          unicode={glyph.unicode || 'N/A'}
        />
      )}
    </div>
  );
};

export default Glyph;