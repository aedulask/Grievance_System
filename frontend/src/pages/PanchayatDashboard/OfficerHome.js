import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OfficerHome.css";

const OfficerHome = () => {
  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0, inProgress: 0 });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/grievances", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const all = res.data;
      const total = all.length;
      const pending = all.filter((g) => g.status === "Pending").length;
      const resolved = all.filter((g) => g.status === "Resolved").length;
      const inProgress = all.filter((g) => g.status === "In Progress").length;
      setStats({ total, pending, resolved, inProgress });
    } catch (err) {
      console.error("Failed to load stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <div className="officer-home"><h2>Loading dashboard...</h2></div>;

  return (
    <div className="officer-home">
      <h1 className="dashboard-title">👨‍💼 Panchayat Officer Dashboard</h1>
      <p className="dashboard-subtitle">Here’s an overview of complaints in your panchayat</p>

      <div className="stats-cards">
        <div className="card total">📊 Total Complaints <span>{stats.total}</span></div>
        <div className="card pending">🆕 Pending <span>{stats.pending}</span></div>
        <div className="card in-progress">🔄 In Progress <span>{stats.inProgress}</span></div>
        <div className="card resolved">✅ Resolved <span>{stats.resolved}</span></div>
      </div>

      <div className="faq-testimonials">
        <h2>ℹ️ Quick Help</h2>
        <ul>
          <li>👉 Use <b>New Complaints</b> to check newly submitted grievances.</li>
          <li>👉 Use <b>Ongoing Complaints</b> to monitor work in progress.</li>
          <li>👉 Use <b>Completed Complaints</b> to verify resolved issues.</li>
        </ul>

        <h2>📝 Notes</h2>
        <p>✔️ Images are now displayed in fixed size for better viewing.</p>
        <p>✔️ Status updates are reflected instantly in dashboards.</p>
      </div>
    </div>
  );
};

export default OfficerHome;
