require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const grievanceRoutes = require("./routes/grievanceRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded (FormData fallback)

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Serve uploads statically
app.use("/uploads", express.static(uploadsDir));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/grievances", grievanceRoutes);
app.use("/api/ai", aiRoutes);

// Health
app.get("/", (req, res) => res.send("Backend is running 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
