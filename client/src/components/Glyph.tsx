import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import type { GlyphType } from '../types';
import Tooltip from './Tooltip';

interface GlyphProps {
  glyph: GlyphType;
}

const Glyph: React.FC<GlyphProps> = ({ glyph }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const glyphRef = useRef<HTMLDivElement>(null);

  // Update position on hover and scroll
  const updatePosition = () => {
    if (glyphRef.current) {
      const rect = glyphRef.current.getBoundingClientRect();
      setTooltipPosition({
        // Position at the top-center of the glyph
        // Subtract 8px to add a small gap between glyph and tooltip arrow
        top: rect.top + window.scrollY - 8,
        left: rect.left + window.scrollX + rect.width / 2,
      });
    }
  };

  useEffect(() => {
    if (isHovered) {
      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
    }
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isHovered]);

  // Fallback for image error (optional aesthetic touch)
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none';
    // You could show a fallback text span here if desired
  };

  return (
    <>
      <div
        ref={glyphRef}
        className="relative inline-flex items-center justify-center m-0.5 p-1 rounded hover:bg-gold/10 transition-colors duration-200 cursor-help group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          // Try gardinerCode first (standard), fallback to id if needed
          src={`/glyphs/${glyph.gardinerCode || glyph.id}.svg`}
          alt={glyph.description || glyph.phoneticValue}
          className="h-10 w-10 sm:h-12 sm:w-12 object-contain filter drop-shadow-sm transition-transform duration-200 group-hover:scale-110"
          onError={handleImageError}
        />

        {/* Fallback text if image fails or loads slowly (visible if img hidden) */}
        <span className="hidden text-xs font-serif">{glyph.phoneticValue}</span>
      </div>

      {/* Portal the Tooltip to document.body to avoid z-index/overflow clipping */}
      {isHovered && ReactDOM.createPortal(
        <div
          style={{
            position: 'absolute',
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            zIndex: 9999,
            pointerEvents: 'none', // Let clicks pass through
          }}
        >
          {/* 
            Wrapper to handle the centering transform. 
            We separate this from the Tooltip component so Framer Motion 
            inside Tooltip doesn't overwrite this transform.
          */}
          <div style={{ transform: 'translate(-50%, -100%)' }}>
            <Tooltip
              title={glyph.phoneticValue || 'Unknown'}
              description={glyph.description || 'No description available.'}
              category={glyph.category || 'General'}
              unicode={glyph.unicode || '—'}
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Glyph;