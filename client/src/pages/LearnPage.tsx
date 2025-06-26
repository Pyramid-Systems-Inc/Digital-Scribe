
import React from 'react';
import { Link } from 'react-router-dom';

const LearnPage: React.FC = () => {
  return (
    <div className="text-center papyrus-bg rounded-lg p-6 sm:p-8 md:p-12 shadow-papyrus">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold nile-blue mb-4 text-shadow-gold">
        Learn About Ancient Egypt
      </h2>
      <p className="text-base sm:text-lg hieroglyph-brown font-serif leading-relaxed max-w-3xl mx-auto mb-8">
        Explore the fascinating world of hieroglyphs, gods, and the history that shaped a civilization.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Link to="/learn/glyphs" className="block p-6 gold-bg rounded-lg shadow-gold hover:opacity-90 transition-opacity">
          <h3 className="text-xl font-display font-bold text-white">Glyph Gallery</h3>
          <p className="font-serif text-white/90">Browse the full collection of hieroglyphs.</p>
        </Link>
        <Link to="/learn/gods" className="block p-6 gold-bg rounded-lg shadow-gold hover:opacity-90 transition-opacity">
          <h3 className="text-xl font-display font-bold text-white">Meet the Gods</h3>
          <p className="font-serif text-white/90">Discover the deities of the Egyptian pantheon.</p>
        </Link>
      </div>
    </div>
  );
};

export default LearnPage;