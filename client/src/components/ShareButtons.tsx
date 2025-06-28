import React from 'react';
import { motion } from 'framer-motion';

interface ShareButtonsProps {
  textToShare: string;
  onDownloadPNG: () => void;
  onDownloadSVG: () => void;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ textToShare, onDownloadPNG, onDownloadSVG }) => {
  const appUrl = "https://your-live-demo-url.com"; // Placeholder URL
  const shareText = `I wrote "${textToShare}" in hieroglyphs using The Digital Scribe! Check it out:`;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(`${appUrl}?text=${encodeURIComponent(textToShare)}`);

  return (
    <div className="mt-4 pt-4 border-t border-gold/20 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      {/* Download Buttons */}
      <motion.button
        onClick={onDownloadPNG}
        className="gold-bg text-white px-4 py-2 rounded-lg text-sm font-sans hover:opacity-90 transition-opacity"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Download PNG
      </motion.button>
      <motion.button
        onClick={onDownloadSVG}
        className="gold-bg text-white px-4 py-2 rounded-lg text-sm font-sans hover:opacity-90 transition-opacity"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Download SVG
      </motion.button>

      {/* Social Share Links */}
      <motion.a
        href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="nile-blue-bg text-white px-4 py-2 rounded-lg text-sm font-sans hover:opacity-90 transition-opacity"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Share on X
      </motion.a>
      <motion.a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="nile-blue-bg text-white px-4 py-2 rounded-lg text-sm font-sans hover:opacity-90 transition-opacity"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Share on Facebook
      </motion.a>
    </div>
  );
};

export default ShareButtons;
