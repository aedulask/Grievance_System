import React from "react";

const Help = () => {
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
        This page provides guidance on how citizens can use the system effectively to file, track, and resolve grievances.
      </p>

      <section style={sectionStyle}>
        <h2>📌 Features for Citizens</h2>
        <ul style={listStyle}>
          <li>
            <strong>File New Grievances:</strong> Submit complaints with details such as category, priority, description, and optional attachments.
          </li>
          <li>
            <strong>Ongoing Grievances:</strong> Track the status of complaints you have submitted and view updates.
          </li>
          <li>
            <strong>Resolved Grievances:</strong> Review complaints that have been addressed and check any feedback.
          </li>
          <li>
            <strong>Notifications:</strong> Receive alerts about status changes or required actions.
          </li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2>🛠️ How to Use</h2>
        <ol style={listStyle}>
          <li>Log in using your registered citizen account.</li>
          <li>Navigate to <em>File New Grievance</em> to submit a complaint.</li>
          <li>Provide all required details and attach any supporting files if needed.</li>
          <li>Monitor your complaints under <em>Ongoing Grievances</em>.</li>
          <li>Check resolved grievances and feedback under <em>Resolved Grievances</em>.</li>
        </ol>
      </section>

      <section style={sectionStyle}>
        <h2>📞 Need More Help?</h2>
        <p>If you encounter issues or have questions about using the system, contact our support team:</p>
        <ul style={listStyle}>
          <li>Email: support@grievancesystem.gov</li>
          <li>Helpline: 1800-123-456</li>
        </ul>
      </section>
    </div>
  );
};

export default Help;
