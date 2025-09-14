import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaUserTag } from "react-icons/fa";
import "./Auth.css";

const Register = () => {
  const [role, setRole] = useState("citizen");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fade, setFade] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setFade(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
        role,
      });

      alert(res.data.message || "Registration successful!");
      // fade out before redirect
      setTimeout(() => navigate("/"), 500);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Registration failed!");
      setFade(false);
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${fade ? "fade-out" : ""}`}>
        <h2 className="auth-title">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <FaUserTag className="input-icon" />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="citizen">Citizen</option>
              <option value="panchayat-officer">Panchayat Officer</option>
            </select>
          </div>

          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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

          <button type="submit" className="btn-primary">Register</button>

          {/* Back to login styled to match reset-password page */}
          <Link to="/" className="btn-back-login" role="button" aria-label="Back to Login">
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
