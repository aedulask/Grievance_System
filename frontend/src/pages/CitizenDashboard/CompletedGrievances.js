import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CompletedGrievances.css";

const CompletedGrievances = () => {
  const [completedGrievances, setCompletedGrievances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedGrievances = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/grievances/completed",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCompletedGrievances(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error fetching completed grievances:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedGrievances();
  }, []);

  if (loading) return <p className="loading">Loading completed grievances...</p>;

  return (
    <div className="completed-grievances">
      <h2>Completed Grievances</h2>

      {completedGrievances.length === 0 ? (
        <p>No completed grievances found.</p>
      ) : (
        completedGrievances.map((g) => (
          <div key={g._id} className="grievance-card">
            <p><strong>ID:</strong> {g._id}</p>
            <p><strong>Date:</strong> {new Date(g.createdAt).toLocaleString()}</p>
            <p><strong>Category:</strong> {g.category || g.autoCategory || "N/A"}</p>
            <p><strong>Description:</strong> {g.description}</p>
            <p><strong>Status:</strong> {g.status}</p>
            <p><strong>Filed By:</strong> {g.name || "—"}</p>
            <p><strong>Priority:</strong> {g.priority || "Low"}</p>
            <p><strong>Pincode:</strong> {g.pincode || "—"}</p>

            {g.image && (
              <div className="mt-2">
                <img
                  src={`http://localhost:5000/uploads/${g.image}`}
                  alt="grievance"
                  className="grievance-image"
                />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CompletedGrievances;
