// frontend/src/components/OfficerDashboard.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import OfficerHome from "./OfficerHome";
import NewComplaints from "./NewComplaints";
import OngoingComplaints from "./OngoingComplaints";
import CompletedComplaints from "./CompletedComplaints";
import "./OfficerDashboard.css";

const OfficerDashboard = () => {
  // ✅ Read the login token (needed for API calls in child pages)
  const token = localStorage.getItem("token");

  return (
    <Router>
      <div>
        {/* ===== Top Navigation Bar ===== */}
        <nav className="officer-navbar">
          <NavLink to="/officer-dashboard" end className="nav-btn">
            🏠 Home
          </NavLink>
          <NavLink to="/officer-dashboard/new-complaints" className="nav-btn">
            🆕 New Complaints
          </NavLink>
          <NavLink to="/officer-dashboard/ongoing-complaints" className="nav-btn">
            🔄 Ongoing Complaints
          </NavLink>
          <NavLink to="/officer-dashboard/completed-complaints" className="nav-btn">
            ✅ Completed Complaints
          </NavLink>
          <NavLink to="/officer-dashboard/help" className="nav-btn">
            ❓ Help
          </NavLink>
        </nav>

        {/* ===== Content Area ===== */}
        <div className="dashboard-content">
          <Routes>
            <Route path="/" element={<OfficerHome />} />
            {/* Pass the token as prop so children can call the backend */}
            <Route path="/new-complaints" element={<NewComplaints token={token} />} />
            <Route path="/ongoing-complaints" element={<OngoingComplaints token={token} />} />
            <Route path="/completed-complaints" element={<CompletedComplaints token={token} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default OfficerDashboard;
