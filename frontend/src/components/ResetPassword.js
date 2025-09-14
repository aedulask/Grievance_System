import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [fade, setFade] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFade(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/reset-password", { token, newPassword });
      alert(res.data.message || "Password reset successfully!");
      setFade(false);
      navigate("/"); // redirect to login
    } catch (err) {
      alert(err.response?.data?.error || "Password reset failed");
      setFade(false);
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${fade ? "fade-out" : ""}`}>
        <h2 className="auth-title">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Reset Password
          </button>
          <div className="auth-links">
            <Link to="/">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
