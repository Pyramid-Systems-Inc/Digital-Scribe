import { motion } from 'framer-motion';
import React from 'react';

interface TooltipProps {
  title: string;
  description: string;
  category: string;
  unicode: string;
  style?: React.CSSProperties;
}

const Tooltip: React.FC<TooltipProps> = ({ title, description, category, unicode, style }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute z-50 w-max max-w-[18rem] sm:max-w-xs pointer-events-none"
      style={style}
      role="tooltip"
    >
      {/* Main Card Content */}
      <div className="bg-nile-blue-dark text-papyrus-light rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.3)] border border-gold/50 overflow-hidden backdrop-blur-sm">

        {/* Header: Phonetic Sound */}
        <div className="bg-nile-blue px-4 py-2 border-b border-gold/20 flex justify-between items-center">
          <div>
            <span className="text-[0.65rem] uppercase tracking-widest text-gold-light opacity-80 font-sans">Phonetic</span>
            <h3 className="font-display font-bold text-xl text-white leading-none mt-0.5">
              "{title}"
            </h3>
          </div>
          <div className="text-right">
            <span className="text-[0.65rem] font-mono text-white/40">{unicode}</span>
          </div>
        </div>

        {/* Body: Info */}
        <div className="p-4 space-y-3">
          <div>
            <span className="text-xs font-bold text-gold-light uppercase tracking-wide font-sans">Meaning</span>
            <p className="text-sm font-serif leading-snug text-papyrus/90 mt-0.5">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-white/10">
            <span className="text-[10px] uppercase tracking-wider text-white/50 font-sans">Category:</span>
            <span className="text-xs font-medium text-gold-light/90 font-serif italic">
              {category}
            </span>
          </div>
        </div>
      </div>

      {/* Arrow / Pointer */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-3 h-3 bg-nile-blue-dark border-r border-b border-gold/50 transform rotate-45"
        aria-hidden="true"
      ></div>
    </motion.div>
  );
};

export default Tooltip;