import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="papyrus-bg border-t-2 border-gold shadow-papyrus mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-display font-semibold nile-blue">
              About Digital Scribe
            </h3>
            <p className="text-sm hieroglyph-brown leading-relaxed font-serif">
              Bridging ancient Egyptian wisdom with modern technology. 
              Transform your words into the timeless beauty of hieroglyphic script.
            </p>
          </div>
          
          {/* Resources Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-display font-semibold nile-blue">
              Resources
            </h3>
            <ul className="space-y-2 text-sm font-serif">
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
          <div className="space-y-4">
            <h3 className="text-lg font-display font-semibold nile-blue">
              Credits
            </h3>
            <div className="text-sm hieroglyph-brown space-y-2 font-serif">
              <p>Built with modern web technologies</p>
              <p>Hieroglyph data sourced from scholarly research</p>
              <p className="flex items-center space-x-2">
                <span>Made with</span>
                <span className="gold-accent text-base">♥</span>
                <span>for ancient wisdom</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-hieroglyph-brown/20 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">𓀀</span>
              </div>
              <span className="text-sm hieroglyph-brown font-serif">
                © 2024 The Digital Scribe
              </span>
            </div>
            
            <div className="text-xs hieroglyph-brown/70 font-serif text-center md:text-right">
              <p>Preserving ancient knowledge for future generations</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;