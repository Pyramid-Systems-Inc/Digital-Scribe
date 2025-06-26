import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LearnPage from './pages/LearnPage';
// Placeholder pages for gallery/profile, can be built out later
// import GlyphGalleryPage from './pages/GlyphGalleryPage';
// import GodsListPage from './pages/GodsListPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-papyrus-light bg-cover bg-fixed bg-no-repeat" style={{ backgroundImage: "url('/papyrus-texture.png')" }}>
        <Header />
        <main className="flex-1 container mx-auto px-2 sm:px-4 py-4 sm:py-6 md:py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/learn" element={<LearnPage />} />
            {/* Add routes for gallery/detail pages once they are created */}
            {/* <Route path="/learn/glyphs" element={<GlyphGalleryPage />} /> */}
            {/* <Route path="/learn/gods" element={<GodsListPage />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;