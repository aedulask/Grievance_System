import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OngoingComplaints.css";

const OngoingComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});

  // Fetch ongoing complaints
  const fetchOngoing = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/grievances/ongoing",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Keep only items that are in an ongoing state
      const ongoingStatuses = ["Pending", "Endorsed", "In Progress"];
      const ongoing = res.data.filter((g) =>
        ongoingStatuses.includes(g.status)
      );
      setComplaints(ongoing);
    } catch (err) {
      console.error("Error fetching ongoing complaints:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOngoing();
  }, []);

  // Update grievance status (e.g., mark as resolved)
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/grievances/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOngoing(); // refresh after update
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update complaint status.");
    }
  };

  // Timeline based on status
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

  if (loading) return <p>Loading ongoing complaints...</p>;

  return (
    <div className="ongoing-complaints">
      <h2>Ongoing Complaints</h2>

      {complaints.length === 0 ? (
        <p>No ongoing complaints.</p>
      ) : (
        complaints.map((c) => (
          <div key={c._id} className="complaint-card">
            <p>
              <strong>ID:</strong> {c._id}
            </p>
            <p>
              <strong>Date:</strong> {new Date(c.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Category:</strong> {c.category || "N/A"}
            </p>
            <p>
              <strong>Sentiment:</strong>{" "}
              <span
                className={`badge ${
                  c.sentiment?.toLowerCase() === "positive"
                    ? "positive"
                    : c.sentiment?.toLowerCase() === "negative"
                    ? "negative"
                    : "neutral"
                }`}
              >
                {c.sentiment || "N/A"}
              </span>
            </p>
            <p>
              <strong>Description:</strong> {c.description}
            </p>
            <p>
              <strong>Status:</strong> {c.status}
            </p>

            {c.image && (
              <div className="mt-2">
                <img
                  src={`http://localhost:5000/uploads/${c.image}`}
                  alt="grievance"
                  style={{
                    width: "300px",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: 8,
                    border: "1px solid #ddd",
                  }}
                />
              </div>
            )}

            <div
              style={{
                marginTop: 12,
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <button
                className="resolve-btn"
                onClick={() => updateStatus(c._id, "Resolved")}
              >
                Mark Resolved
              </button>

              <button
                className="track-btn"
                onClick={() =>
                  setExpanded((prev) => ({ ...prev, [c._id]: !prev[c._id] }))
                }
              >
                {expanded[c._id] ? "Hide Status" : "Show Status"}
              </button>
            </div>

            {expanded[c._id] && (
              <ul style={{ marginTop: 10 }}>
                {trackingFromStatus(c.status).map((t, idx) => (
                  <li key={idx} style={{ opacity: t.completed ? 1 : 0.6 }}>
                    {t.completed ? "✅" : "⏳"} {t.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default OngoingComplaints;
