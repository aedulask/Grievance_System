import React from "react";

const OfficerHelp = () => {
  const containerStyle = {
    maxWidth: "800px",
    margin: "20px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    lineHeight: 1.6,
    color: "#333",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#1a73e8",
  };

  const sectionStyle = {
    marginTop: "20px",
  };

  const listStyle = {
    marginLeft: "20px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Help & Support</h1>
      <p>
        Welcome to the <strong>Grievance Management System</strong>.  
        This page provides guidance on how Panchayat Officers can use the system effectively.
      </p>

      <section style={sectionStyle}>
        <h2>📌 Features for Panchayat Officers</h2>
        <ul style={listStyle}>
          <li>
            <strong>New Complaints:</strong> View and review complaints recently submitted by citizens.
          </li>
          <li>
            <strong>Ongoing Complaints:</strong> Track complaints that are in progress and update their status.
          </li>
          <li>
            <strong>Completed Complaints:</strong> View complaints that have been resolved and closed.
          </li>
          <li>
            <strong>Notifications:</strong> Receive alerts for new complaints or actions required.
          </li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2>🛠️ How to Use</h2>
        <ol style={listStyle}>
          <li>Log in with your Panchayat Officer credentials.</li>
          <li>Navigate using the menu bar to access <em>New</em>, <em>Ongoing</em>, or <em>Completed</em> complaints.</li>
          <li>Update complaint details, assign tasks, and mark complaints as <em>resolved</em> when complete.</li>
          <li>Use the <em>Help</em> section (this page) for quick guidance.</li>
        </ol>
      </section>

      <section style={sectionStyle}>
        <h2>📞 Need More Help?</h2>
        <p>
          If you face issues while using the system, contact the technical support team:
        </p>
        <ul style={listStyle}>
          <li>Email: support@grievancesystem.gov</li>
          <li>Helpline: 1800-123-456</li>
        </ul>
      </section>
    </div>
  );
};

export default OfficerHelp;
