import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import GodProfilePage from './pages/GodProfilePage';
import GodsListPage from './pages/GodsListPage';
import HomePage from './pages/HomePage';
import LearnPage from './pages/LearnPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative overflow-x-hidden">
        {/* 
          Background is now handled globally in index.css.
          We add a subtle gradient overlay here for depth if needed, 
          or keep it clean to let the body texture shine.
        */}

        <Header />

        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/learn/gods" element={<GodsListPage />} />
            <Route path="/learn/gods/:id" element={<GodProfilePage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;