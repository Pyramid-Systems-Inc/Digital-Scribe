import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HieroglyphComposer from './components/HieroglyphComposer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-parchment">
      <Header />
      <main className="flex-1 container mx-auto px-2 sm:px-4 py-4 sm:py-6 md:py-8">
        <HieroglyphComposer />
      </main>
      <Footer />
    </div>
  );
}

export default App;
