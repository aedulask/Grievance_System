import React from "react";
import { NavLink } from "react-router-dom";
import "./CitizenNav.css";

const CitizenNav = () => {
  return (
    <nav className="citizen-nav">
      <NavLink 
        to="/citizen/home" 
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Home
      </NavLink>
      <NavLink 
        to="/citizen/ongoing" 
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Ongoing Grievances
      </NavLink>
      <NavLink 
        to="/citizen/completed" 
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Completed Grievances
      </NavLink>
      <NavLink 
        to="/citizen/file-grievance" 
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        File a New Grievance
      </NavLink>
      <NavLink 
        to="/citizen/help" 
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Help
      </NavLink>
    </nav>
  );
};

export default CitizenNav;
