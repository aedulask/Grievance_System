import React from "react";

const CitizenHome = () => {
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
      <h1 style={headingStyle}>Welcome to the Citizen Dashboard</h1>
      <p>
        This dashboard is your central hub for managing and tracking grievances in the system.
        As a citizen, you can easily file new complaints, monitor ongoing issues, and stay updated
        on the progress of each grievance.
      </p>

      <section style={sectionStyle}>
        <h2>Key Features:</h2>
        <ul style={listStyle}>
          <li>
            <strong>File a New Grievance:</strong> Submit your complaints or concerns with relevant
            details and attachments, such as documents or images.
          </li>
          <li>
            <strong>Track Ongoing Grievances:</strong> Monitor the status of your grievances through
            every stage, from submission to resolution.
          </li>
          <li>
            <strong>Receive Updates:</strong> Get real-time notifications on any actions taken or required.
          </li>
          <li>
            <strong>Contact Authorities:</strong> Access contact details of relevant officers handling your grievances.
          </li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2>How to Use:</h2>
        <ol style={listStyle}>
          <li>Click on "File New Grievance" to submit a complaint.</li>
          <li>Provide necessary information, including category, priority, description, and attachments.</li>
          <li>Track your grievance status under "Ongoing Grievances".</li>
          <li>Review updates and provide feedback if required.</li>
        </ol>
      </section>

      <p>
        This platform ensures transparency, accountability, and timely resolution of citizen grievances,
        helping you voice concerns and track actions effectively.
      </p>
    </div>
  );
};

export default CitizenHome;
