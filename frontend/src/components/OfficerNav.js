import React from "react";
import { NavLink } from "react-router-dom";
import "./OfficerNav.css";

const OfficerNav = () => {
  return (
    <nav className="officer-nav">
      <NavLink 
        to="/panchayat-officer/New-home" 
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Home
      </NavLink>
      <NavLink 
        to="/panchayat-officer/new-complaints" 
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        New Complaints
      </NavLink>
      <NavLink 
        to="/panchayat-officer/ongoing-complaints" 
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Ongoing Complaints
      </NavLink>
      <NavLink 
        to="/panchayat-officer/completed-complaints" 
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Completed Complaints
      </NavLink>
      <NavLink 
        to="/panchayat-officer/help" 
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Help
      </NavLink>
    </nav>
  );
};

export default OfficerNav;
