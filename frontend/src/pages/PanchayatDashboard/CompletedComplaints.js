import React, { useEffect, useState } from "react";
import "./CompletedComplaints.css";
import axios from "axios";

const CompletedComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/grievances/completed",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setComplaints(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching completed complaints:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompleted();
  }, []);

  // Timeline for completed complaints (all steps done)
  const trackingFromStatus = () => [
    { name: "Submitted", completed: true },
    { name: "Endorsed", completed: true },
    { name: "Sent to Officer", completed: true },
    { name: "Resolution in Progress", completed: true },
    { name: "Feedback Collection", completed: true },
    { name: "Resolved", completed: true },
  ];

  if (loading) return <p>Loading completed complaints...</p>;

  return (
    <div className="completed-complaints">
      <h2>Completed Complaints</h2>

      {complaints.length > 0 ? (
        complaints.map((c) => (
          <div key={c._id} className="complaint-card">
            <p>
              <strong>ID:</strong> {c._id}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(c.createdAt).toLocaleString()}
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

            <div style={{ marginTop: 12 }}>
              <button
                className="track-btn"
                onClick={() =>
                  setExpanded((prev) => ({ ...prev, [c._id]: !prev[c._id] }))
                }
              >
                {expanded[c._id] ? "Hide Status" : "Show Status"}
              </button>

              {expanded[c._id] && (
                <ul style={{ marginTop: 10 }}>
                  {trackingFromStatus().map((t, idx) => (
                    <li
                      key={idx}
                      style={{ opacity: t.completed ? 1 : 0.6 }}
                    >
                      {t.completed ? "✅" : "⏳"} {t.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No completed complaints found.</p>
      )}
    </div>
  );
};

export default CompletedComplaints;
