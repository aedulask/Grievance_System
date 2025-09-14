import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import axios from "axios";
import "./Auth.css";

export default function Login() {
  const [role, setRole] = useState("Citizen");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fade, setFade] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFade(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const userObj = res.data.user;
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(userObj));

      const roleLower = userObj.role?.toLowerCase();

      setTimeout(() => {
        if (roleLower === "citizen") {
          navigate("/citizen-dashboard", { replace: true });
        } else if (roleLower === "panchayat-officer") {
          navigate("/officer-dashboard", { replace: true });
        }
      }, 300);
    } catch (err) {
      alert(err.response?.data?.error || "Login failed!");
      setFade(false);
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${fade ? "fade-out" : ""}`}>
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="Citizen">Citizen</option>
              <option value="Panchayat Officer">Panchayat Officer</option>
            </select>
          </div>

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>

        <div className="auth-links">
          <Link to="/forgot-password">Forgot Password?</Link> |{" "}
          <Link to="/register">Create Account</Link>
        </div>
      </div>
    </div>
  );
}
