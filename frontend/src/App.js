import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";

// Auth Pages
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

// Citizen Dashboard
import CitizenNav from "./components/CitizenNav";
import CitizenHome from "./pages/CitizenDashboard/CitizenHome";
import OngoingGrievances from "./pages/CitizenDashboard/OngoingGrievances";
import CompletedGrievances from "./pages/CitizenDashboard/CompletedGrievances";
import FileNewGrievance from "./pages/CitizenDashboard/FileNewGrievance";
import CitizenHelp from "./pages/CitizenDashboard/Help";

// Panchayat Officer Dashboard
import OfficerNav from "./components/OfficerNav";
import Phome from "./pages/PanchayatDashboard/PanchayatHome";
import NewComplaints from "./pages/PanchayatDashboard/NewComplaints";
import OngoingComplaints from "./pages/PanchayatDashboard/OngoingComplaints";
import CompletedComplaints from "./pages/PanchayatDashboard/CompletedComplaints";
import OfficerHelp from "./pages/PanchayatDashboard/OfficerHelp";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Header />
      <Routes>
        {/* Auth Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Direct dashboard routes */}
        <Route
          path="/citizen-dashboard"
          element={
            <>
              <CitizenNav />
              <CitizenHome token={token} />
            </>
          }
        />

        <Route
          path="/officer-dashboard"
          element={
            <>
              <OfficerNav />
              <NewComplaints token={token} /> {/* Default officer home */}
            </>
          }
        />

        {/* Citizen Dashboard Nested Routes */}
        <Route
          path="/citizen/*"
          element={
            <>
              <CitizenNav />
              <Routes>
                <Route path="home" element={<CitizenHome token={token} />} />
                <Route path="ongoing" element={<OngoingGrievances token={token} />} />
                <Route path="completed" element={<CompletedGrievances token={token} />} />
                <Route path="file-grievance" element={<FileNewGrievance token={token} />} />
                <Route path="help" element={<CitizenHelp />} />
              </Routes>
            </>
          }
        />

        {/* Panchayat Officer Dashboard Nested Routes */}
        <Route
          path="/panchayat-officer/*"
          element={
            <>
              <OfficerNav />
              <Routes>
                <Route path="New-Home" element={<Phome token={token} />} />
                <Route path="new-complaints" element={<NewComplaints token={token} />} />
                <Route path="ongoing-complaints" element={<OngoingComplaints token={token} />} />
                <Route path="completed-complaints" element={<CompletedComplaints token={token} />} />
                <Route path="help" element={<OfficerHelp />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
