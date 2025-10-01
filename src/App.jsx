import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import EducationLevelPage from './pages/EducationLevelPage';
import About from './pages/About';
import Services from './pages/Services';
import Navbar from './components/layout/Navbar';

function AppContent() {
  const location = useLocation();

  // Hide Navbar on any "/:level/:dashboard/*" route
  const hideNavbar = /^\/[^/]+\/[^/]+/.test(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/:level/:dashboard/*" element={<EducationLevelPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
