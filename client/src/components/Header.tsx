import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="papyrus-bg border-b-2 border-gold shadow-papyrus sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 md:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold rounded-full flex items-center justify-center shadow-gold flex-shrink-0">
              <span className="text-white font-bold text-lg sm:text-xl">𓀀</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold nile-blue text-shadow-gold">
                The Digital Scribe
              </h1>
              <p className="text-xs sm:text-sm hieroglyph-brown opacity-80 font-serif">
                Ancient Wisdom, Modern Technology
              </p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <a
              href="#composer"
              className="text-nile-blue hover:text-gold transition-colors duration-200 font-sans font-medium text-sm lg:text-base"
            >
              Composer
            </a>
            <a 
              href="#about" 
              className="text-nile-blue hover:text-gold transition-colors duration-200 font-sans font-medium"
            >
              About
            </a>
            <a 
              href="#history" 
              className="text-nile-blue hover:text-gold transition-colors duration-200 font-sans font-medium"
            >
              History
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;