import React, { useState } from "react";
import "./GrievanceCard.css";

const GrievanceCard = ({ grievance }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const trackingFromStatus = (status) => [
    { name: "Submitted", completed: true },
    { name: "Endorsed", completed: status !== "Pending" },
    { name: "Sent to Officer", completed: status === "In Progress" || status === "Resolved" },
    { name: "Resolution in Progress", completed: status === "In Progress" || status === "Resolved" },
    { name: "Feedback Collection", completed: status === "Resolved" },
    { name: "Resolved", completed: status === "Resolved" },
  ];

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  // ✅ Sentiment badge function
  const sentimentBadge = (sentiment) => {
    if (!sentiment) return <span className="badge neutral">N/A</span>;
    switch (sentiment.toLowerCase()) {
      case "positive":
        return <span className="badge positive">😊 Positive</span>;
      case "negative":
        return <span className="badge negative">😡 Negative</span>;
      default:
        return <span className="badge neutral">😐 Neutral</span>;
    }
  };

  return (
    <div className="grievance-card">
      <div className="card-header">
        <div className="header-left">
          <h3>ID: {grievance._id || grievance.id}</h3>
          <p>Date: {new Date(grievance.createdAt || grievance.date).toLocaleString()}</p>
        </div>
        <button className="toggle-btn" onClick={toggleExpand}>
          {isExpanded ? "Hide Status" : "Show Status"}
        </button>
      </div>

      <div className="card-details">
        <p><strong>Category:</strong> {grievance.category}</p>
        <p><strong>AI Suggested Category:</strong> {grievance.autoCategory || "N/A"}</p>
        <p><strong>Sentiment:</strong> {sentimentBadge(grievance.sentiment)}</p>
        <p><strong>Priority:</strong> {grievance.priority || "N/A"}</p>
        <p>
          <strong>Description:</strong>{" "}
          {grievance.description.length > 50
            ? `${grievance.description.slice(0, 50)}...`
            : grievance.description}
        </p>
      </div>

      {grievance.image && (
        <div className="grievance-image">
          <img
            src={`http://localhost:5000/uploads/${grievance.image}`}
            alt="grievance"
            style={{
              width: "300px",
              height: "200px",
              objectFit: "cover",
              borderRadius: 8,
              border: "1px solid #ddd",
              marginTop: 10,
            }}
          />
        </div>
      )}

      {isExpanded && (
        <div className="card-expanded">
          <h4>Tracking Status:</h4>
          <ul className="tracking-list">
            {trackingFromStatus(grievance.status).map((stage, idx) => (
              <li key={idx} style={{ opacity: stage.completed ? 1 : 0.6 }}>
                {stage.completed ? "✅" : "⏳"} {stage.name}
              </li>
            ))}
          </ul>

          {grievance.contact && (
            <>
              <h4>Contact:</h4>
              <p>{grievance.contact}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GrievanceCard;
