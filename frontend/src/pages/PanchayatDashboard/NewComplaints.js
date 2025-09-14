import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NewComplaints.css";

const NewComplaints = ({ token }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/grievances/ongoing",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Keep only items that aren’t resolved
        const ongoing = response.data.filter((g) => g.status !== "Resolved");
        setComplaints(ongoing);
      } catch (err) {
        console.error("Error fetching complaints:", err);
        setError("Failed to load complaints.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [token]);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/grievances/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the status locally
      setComplaints((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, status: res.data.status } : c
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  if (loading) return <p>Loading complaints...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="complaints-container">
      <h2>New Complaints</h2>

      {complaints.length === 0 ? (
        <p>No new complaints found.</p>
      ) : (
        complaints.map((complaint) => (
          <div key={complaint._id} className="complaint-card">
            <p>
              <strong>Citizen:</strong> {complaint.name || "—"}
            </p>
            <p>
              <strong>Category:</strong>{" "}
              {complaint.category || complaint.autoCategory || "—"}
            </p>
            <p>
              <strong>Description:</strong> {complaint.description || "—"}
            </p>
            <p>
              <strong>Status:</strong> {complaint.status || "—"}
            </p>

            {complaint.image && (
              <img
                src={`http://localhost:5000/uploads/${complaint.image}`}
                alt="grievance"
                className="complaint-img"
              />
            )}

            {complaint.status !== "Resolved" && (
              <div className="actions">
                <button
                  onClick={() =>
                    handleUpdateStatus(complaint._id, "Resolved")
                  }
                >
                  Resolve
                </button>
                <button
                  onClick={() =>
                    handleUpdateStatus(complaint._id, "Endorsed")
                  }
                >
                  Endorse
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default NewComplaints;
