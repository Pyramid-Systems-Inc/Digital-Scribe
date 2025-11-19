import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Glassy Background Container */}
      <div className="absolute inset-0 bg-papyrus-light/85 backdrop-blur-md border-b border-gold/30 shadow-papyrus"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Title Area */}
          <Link to="/" className="group flex items-center space-x-3 sm:space-x-4">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-transform duration-500 group-hover:rotate-12">
              {/* Decorative ring behind logo */}
              <div className="absolute inset-0 rounded-full border-2 border-gold/40 shadow-[0_0_15px_rgba(217,119,6,0.3)]"></div>
              <div className="w-full h-full bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center shadow-inner border border-white/20">
                <span className="text-white font-bold text-lg sm:text-xl drop-shadow-md">𓀀</span>
              </div>
            </div>

            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-gold-gradient leading-tight">
                The Digital Scribe
              </h1>
              <span className="text-xs sm:text-sm text-nile-blue/80 font-serif tracking-wider uppercase">
                Ancient Wisdom, Modern Tech
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="relative text-nile-blue font-display font-semibold text-sm lg:text-base tracking-wide transition-colors duration-200 hover:text-gold group py-2"
            >
              Composer
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/learn"
              className="relative text-nile-blue font-display font-semibold text-sm lg:text-base tracking-wide transition-colors duration-200 hover:text-gold group py-2"
            >
              Learn
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <a
              href="https://github.com/Pyramid-Systems-Inc/Digital-Scribe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-nile-blue/5 border border-nile-blue/10 text-nile-blue font-sans font-medium text-sm hover:bg-nile-blue hover:text-white hover:shadow-lg hover:shadow-nile-blue/20 transition-all duration-300"
            >
              <span>GitHub</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </nav>

          {/* Mobile Menu Button (Simple Placeholder) */}
          <button className="md:hidden text-nile-blue hover:text-gold transition-colors p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;