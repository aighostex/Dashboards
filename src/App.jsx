import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import EducationLevelPage from './pages/EducationLevelPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:level/:dashboard/*" element={<EducationLevelPage />} />
      </Routes>
    </Router>
  );
}

export default App;