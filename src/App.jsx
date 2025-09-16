// import React from "react"
// import EnrolmentDashboard from "./pages/dashboards/prePrimary/EnrolmentDashboard";
// // import PrePrimaryDashboard from "./pages/PrePrimaryDashboard";
// // import PrivatePrePrimaryDashboard from "./pages/PrivatePrePrimaryDashboard";
// // import PrePrimaryComparisonDashboard from "./pages/PrePrimaryComparisonDashboard";

// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/enrolment" replace />} />
//         <Route path="/enrolment" element={<EnrolmentDashboard />} />
//         {/* <Route path="/preprimary" element={<PrePrimaryDashboard />} />
//         <Route path="/privatepreprimary" element={<PrivatePrePrimaryDashboard />} />
//         <Route path="/preprimarycomparison" element={<PrePrimaryComparisonDashboard />} /> */}
//       </Routes>
//     </Router>
//   )
// }

// export default App


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import EducationLevelPage from './pages/EducationLevelPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:level/:dashboard?/*" element={<EducationLevelPage />} />
      </Routes>
    </Router>
  );
}

export default App;