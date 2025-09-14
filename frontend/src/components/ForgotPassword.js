import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [fade, setFade] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFade(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      alert(res.data.message || "Reset link sent to your email!");
      setFade(false);
      setEmail(""); // clear input
    } catch (err) {
      alert(err.response?.data?.error || "Failed to send reset email");
      setFade(false);
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${fade ? "fade-out" : ""}`}>
        <h2 className="auth-title">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Send Reset Link
          </button>
          <div className="auth-links">
            <Link to="/">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
