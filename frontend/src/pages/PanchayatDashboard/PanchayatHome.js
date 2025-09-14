import React from "react";

const PanchayatHome = () => {
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
      <h1 style={headingStyle}>Welcome to the Panchayat Officer Dashboard</h1>
      <p>
        This dashboard is your central hub for managing citizen grievances efficiently. As a Panchayat Officer, you can review new complaints, track ongoing issues, and ensure timely resolutions to improve governance and transparency.
      </p>

      <section style={sectionStyle}>
        <h2>📌 Key Features:</h2>
        <ul style={listStyle}>
          <li>
            <strong>New Complaints:</strong> View and review complaints recently submitted by citizens.
          </li>
          <li>
            <strong>Ongoing Complaints:</strong> Monitor complaints in progress, update their status, and assign tasks as needed.
          </li>
          <li>
            <strong>Completed Complaints:</strong> Check resolved complaints, provide feedback, and close cases efficiently.
          </li>
          <li>
            <strong>Notifications:</strong> Receive alerts when new complaints are submitted or when actions are required.
          </li>
          <li>
            <strong>Reports & Analytics:</strong> Analyze trends in grievances, identify recurring issues, and plan interventions.
          </li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2>🛠️ How to Use:</h2>
        <ol style={listStyle}>
          <li>Log in with your Panchayat Officer credentials.</li>
          <li>Navigate to the appropriate section: <em>New</em>, <em>Ongoing</em>, or <em>Completed</em> complaints.</li>
          <li>Review complaint details, add comments, and update the status as required.</li>
          <li>Communicate with citizens if more information or clarification is needed.</li>
          <li>Close complaints only after verification and resolution.</li>
        </ol>
      </section>

      <section style={sectionStyle}>
        <h2>📞 Need Assistance?</h2>
        <p>
          If you face any technical issues or have questions about using the system, contact your technical support team:
        </p>
        <ul style={listStyle}>
          <li>Email: support@grievancesystem.gov</li>
          <li>Helpline: 1800-123-456</li>
        </ul>
      </section>
    </div>
  );
};

export default PanchayatHome;
