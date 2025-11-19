import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-nile-blue-dark text-papyrus border-t-4 border-gold relative z-10 mt-16">
      {/* Decorative top pattern (CSS gradient) */}
      <div className="h-1 w-full bg-gradient-to-r from-gold-dark via-gold to-gold-dark"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">

          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(217,119,6,0.5)]">
                <span className="text-white font-bold text-xl">𓀀</span>
              </div>
              <span className="text-2xl font-display font-bold text-gold-light tracking-wide">
                Digital Scribe
              </span>
            </div>
            <p className="text-papyrus/70 font-serif text-sm leading-relaxed max-w-xs">
              Bridging the sands of time with the code of today. Transform your words into the timeless beauty of the Pharaohs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-semibold text-white mb-4 border-b border-white/10 pb-2 inline-block">
              Explore
            </h3>
            <ul className="space-y-3 font-sans text-sm">
              <li>
                <Link to="/" className="text-papyrus/80 hover:text-gold hover:pl-1 transition-all duration-200 flex items-center gap-2">
                  <span>↠</span> Composer Tool
                </Link>
              </li>
              <li>
                <Link to="/learn" className="text-papyrus/80 hover:text-gold hover:pl-1 transition-all duration-200 flex items-center gap-2">
                  <span>↠</span> Learn Hieroglyphs
                </Link>
              </li>
              <li>
                <Link to="/learn/gods" className="text-papyrus/80 hover:text-gold hover:pl-1 transition-all duration-200 flex items-center gap-2">
                  <span>↠</span> Egyptian Gods
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect / Credits */}
          <div>
            <h3 className="text-lg font-display font-semibold text-white mb-4 border-b border-white/10 pb-2 inline-block">
              Connect
            </h3>
            <p className="text-papyrus/70 font-serif text-sm mb-4">
              Open source project for educational preservation.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Pyramid-Systems-Inc/Digital-Scribe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-papyrus hover:bg-gold hover:text-white hover:border-gold transition-all duration-300"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-papyrus/50">
          <p>&copy; {currentYear} The Digital Scribe. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-red-500 animate-pulse">♥</span> in Cairo, Egypt
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;