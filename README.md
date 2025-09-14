Grievance Management System

## Project Overview
A full-stack web application for managing grievances efficiently. Citizens can submit grievances, track their status, and Panchayat administrators can view, resolve, and manage complaints.

**Problem Statement:**  
Managing grievances manually in local administrations is time-consuming and often lacks transparency. This project provides a full-stack web application to allow citizens to file grievances, track their status, and enable Panchayat administrators to view, categorize, and resolve complaints efficiently. The system also uses AI-based categorization (rule-based and sentiment-based) to prioritize and manage grievances automatically.  

**Category:** Web Application / AI-assisted Administrative Tools  

---

## Team Members

- A. Shrikanta  
- G. Srujan Tej  
- B. Aashish Reddy  

---

## Features

- **Citizen Dashboard:** Submit grievances with optional attachments, view all submissions, and track status in real-time.  
- **Panchayat Dashboard:** View, filter, and resolve grievances efficiently.  
- **AI Categorization:** Rule-based and sentiment-based analysis to automatically prioritize and categorize complaints.  
- **Authentication & Security:** Role-based login for citizens and admins, secure password storage, and JWT-protected APIs.  
- **Tech Stack:** Node.js + Express backend, MongoDB database, React frontend with responsive UI.  

---

## Technology Stack

- **Frontend:** React, CSS  
- **Backend:** Node.js, Express  
- **Database:** MongoDB (local or cloud)  
- **Authentication:** JWT (JSON Web Tokens)  
- **Other Tools:** Axios, React Router  

---

System Architecture & Workflow

        +--------------------+
        |   React Frontend   |
        |  (Citizen & Admin)|
        +---------+----------+
                  |
                  v
        +--------------------+
        | Node.js / Express  |
        |    Backend API     |
        +---------+----------+
                  |
          +-------+-------+
          |               |
          v               v
    MongoDB Database   AI Categorization
  (Users & Grievances)  (Rule & Sentiment)

## License

This project is for academic/educational purposes.
