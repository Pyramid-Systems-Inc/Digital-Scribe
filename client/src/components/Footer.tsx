import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="papyrus-bg border-t-2 border-gold shadow-papyrus mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {/* About Section */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-display font-semibold nile-blue">
              About Digital Scribe
            </h3>
            <p className="text-xs sm:text-sm hieroglyph-brown leading-relaxed font-serif">
              Bridging ancient Egyptian wisdom with modern technology.
              Transform your words into the timeless beauty of hieroglyphic script.
            </p>
          </div>
          
          {/* Resources Section */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-display font-semibold nile-blue">
              Resources
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm font-serif">
              <li>
                <a href="#" className="hieroglyph-brown hover:gold-accent transition-colors duration-200">
                  Hieroglyph Dictionary
                </a>
              </li>
              <li>
                <a href="#" className="hieroglyph-brown hover:gold-accent transition-colors duration-200">
                  Egyptian History
                </a>
              </li>
              <li>
                <a href="#" className="hieroglyph-brown hover:gold-accent transition-colors duration-200">
                  Learn More
                </a>
              </li>
            </ul>
          </div>
          
          {/* Credits Section */}
          <div className="space-y-3 sm:space-y-4 sm:col-span-2 md:col-span-1">
            <h3 className="text-base sm:text-lg font-display font-semibold nile-blue">
              Credits
            </h3>
            <div className="text-xs sm:text-sm hieroglyph-brown space-y-1.5 sm:space-y-2 font-serif">
              <p>Built with modern web technologies</p>
              <p>Hieroglyph data sourced from scholarly research</p>
              <p className="flex items-center space-x-1.5 sm:space-x-2">
                <span>Made with</span>
                <span className="gold-accent text-sm sm:text-base">♥</span>
                <span>for ancient wisdom</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-hieroglyph-brown/20 mt-6 sm:mt-8 pt-4 sm:pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 sm:space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs sm:text-sm">𓀀</span>
              </div>
              <span className="text-xs sm:text-sm hieroglyph-brown font-serif">
                © 2024 The Digital Scribe
              </span>
            </div>
            
            <div className="text-[0.65rem] sm:text-xs hieroglyph-brown/70 font-serif text-center md:text-right">
              <p>Preserving ancient knowledge for future generations</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;