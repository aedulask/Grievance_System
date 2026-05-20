import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./OngoingGrievances.css";

const OngoingGrievances = ({ token }) => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});

  // Fetch ongoing grievances
  const fetchGrievances = useCallback(async () => {
  if (!token) return;

  try {
    const res = await axios.get(
      "http://localhost:5000/api/grievances/ongoing",
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setGrievances(Array.isArray(res.data) ? res.data : []);
  } catch (err) {
    console.error("Error fetching ongoing grievances:", err);
    setError("Failed to load grievances.");
  } finally {
    setLoading(false);
  }
}, [token]);
// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  if (!token) {
    setError("Not authenticated. Please login.");
    setLoading(false);
    return;
  }

  fetchGrievances();
}, [token, fetchGrievances]);
  // For showing status steps
  const trackingFromStatus = (status) => [
    { name: "Submitted", completed: true },
    { name: "Endorsed", completed: status !== "Pending" },
    {
      name: "Sent to Officer",
      completed: status === "In Progress" || status === "Resolved",
    },
    {
      name: "Resolution in Progress",
      completed: status === "In Progress" || status === "Resolved",
    },
    { name: "Feedback Collection", completed: status === "Resolved" },
    { name: "Resolved", completed: status === "Resolved" },
  ];

  if (loading) return <p className="loading">Loading grievances...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="ongoing-grievances">
      <h2>Ongoing Grievances</h2>

      {grievances.length === 0 ? (
        <p className="no-grievances">No grievances found.</p>
      ) : (
        <div className="grievance-list">
          {grievances.map((g) => (
            <div className="grievance-card" key={g._id}>
              <div className="card-details">
                <div className="grievance-header">
                  <h3 className="grievance-title">
                    {g.description?.slice(0, 50) || "Grievance"}
                  </h3>
                  <span className={`status-badge ${g.status.toLowerCase()}`}>
                    {g.status}
                  </span>
                </div>

                <p>
                  <strong>Filed By:</strong> {g.name || "—"}
                </p>
                <p>
                  <strong>Category:</strong> {g.category || "—"}
                </p>
                <p>
                  <strong>Priority:</strong> {g.priority || "Low"}
                </p>
                <p>
                  <strong>Sentiment:</strong> {g.sentiment || "Neutral"}
                </p>
                <p>
                  <strong>Pincode:</strong> {g.pincode || "—"}
                </p>
                <p className="created-at">
                  Filed on: {new Date(g.createdAt).toLocaleString()}
                </p>
              </div>

              {g.image && (
                <div className="card-image">
                  <img
                    src={`http://localhost:5000/uploads/${g.image}`}
                    alt="grievance"
                  />
                </div>
              )}

              <div style={{ marginTop: 12 }}>
                <button
                  className="track-btn"
                  onClick={() =>
                    setExpanded((prev) => ({ ...prev, [g._id]: !prev[g._id] }))
                  }
                >
                  {expanded[g._id] ? "Hide Status" : "Show Status"}
                </button>
              </div>

              {expanded[g._id] && (
                <ul className="status-list">
                  {trackingFromStatus(g.status).map((t, idx) => (
                    <li
                      key={idx}
                      className={t.completed ? "done" : "pending"}
                    >
                      {t.completed ? "✅" : "⏳"} {t.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OngoingGrievances;
