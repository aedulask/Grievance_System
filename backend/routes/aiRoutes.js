// backend/routes/aiRoutes.js
const express = require("express");
const router = express.Router();
const { analyzeGrievance } = require("../services/aiService");

// Simple chat endpoint: expects { prompt }
router.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await analyzeGrievance(prompt || "");
    res.json({ result });
  } catch (err) {
    console.error("AI route error:", err.message);
    res.status(500).json({ error: "AI server error" });
  }
});

module.exports = router;
