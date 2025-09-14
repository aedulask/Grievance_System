import React, { useState, useEffect } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setUserEmail(parsed.email || "");
        setUserRole(parsed.role || "");
      } catch {
        setUserEmail("");
        setUserRole("");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserEmail("");
    setUserRole("");
    setActiveMenu(null);
    navigate("/", { replace: true });
  };

  const toggleMenu = (menu) =>
    setActiveMenu((prev) => (prev === menu ? null : menu));

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/dashboard")}>
        Grievance System
      </div>

      {userEmail ? (
        <div className="icons">
          <i
            className="fas fa-user-circle"
            onClick={() => toggleMenu("user")}
          ></i>
          {activeMenu === "user" && (
            <div className="user-info-popup">
              <p>
                <strong>Email:</strong> {userEmail}
              </p>
              <p>
                <strong>Role:</strong> {userRole}
              </p>
            </div>
          )}

          <i className="fas fa-cog" onClick={() => toggleMenu("settings")}></i>
          {activeMenu === "settings" && (
            <div className="settings-dropdown">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      ) : null}
    </header>
  );
};

export default Header;
