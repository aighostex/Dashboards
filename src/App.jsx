import React from "react"
import EnrolmentDashboard from "./pages/EnrolmentDashboard"
import PrePrimaryDashboard from "./pages/PrePrimaryDashboard";
import PrivatePrePrimaryDashboard from "./pages/PrivatePrePrimaryDashboard";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/enrolment" replace />} />
        <Route path="/enrolment" element={<EnrolmentDashboard />} />
        <Route path="/preprimary" element={<PrePrimaryDashboard />} />
        <Route path="/privatepreprimary" element={<PrivatePrePrimaryDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
