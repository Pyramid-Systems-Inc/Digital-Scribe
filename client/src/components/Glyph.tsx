import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import type { GlyphType } from '../types.ts';
import Tooltip from './Tooltip.tsx';

interface GlyphProps {
  glyph: GlyphType;
}

const Glyph: React.FC<GlyphProps> = ({ glyph }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const glyphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovered && glyphRef.current) {
      const rect = glyphRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX + rect.width / 2,
      });
    }
  }, [isHovered]);

  return (
    <div
      ref={glyphRef}
      className="relative inline-block m-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`/glyphs/${glyph.gardinerCode}.svg`}
        alt={glyph.description || glyph.phoneticValue || glyph.gardinerCode}
        className="h-8 w-8 object-contain" // Adjusted size
      />
      {isHovered && ReactDOM.createPortal(
        <Tooltip
          title={glyph.phoneticValue || 'N/A'}
          description={glyph.description || 'No description available.'}
          category={glyph.category || 'Unknown'}
          unicode={glyph.unicode || 'N/A'}
          style={{
            position: 'absolute',
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            transform: 'translate(-50%, -100%)', // Center tooltip above the glyph
          }}
        />,
        document.body
      )}
    </div>
  );
};

export default Glyph;