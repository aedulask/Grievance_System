require("dotenv").config();
const OpenAI = require("openai");

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const analyzeGrievance = async (description) => {
  if (!description) return { category: "Other", sentiment: "Neutral", priority: "Low" };

  const lower = description.toLowerCase();

  // ===== Rule-based category detection =====
  let category = "Other";
  if (lower.includes("road") || lower.includes("pothole") || lower.includes("street")) category = "Road";
  else if (lower.includes("water") || lower.includes("tap") || lower.includes("sewer") || lower.includes("leakage")) category = "Water";
  else if (lower.includes("electric") || lower.includes("power") || lower.includes("light")) category = "Electricity";

  // Sentiment detection
  let sentiment = "Neutral";
  if (lower.includes("angry") || lower.includes("bad") || lower.includes("urgent")) sentiment = "Negative";
  else if (lower.includes("good") || lower.includes("satisfied")) sentiment = "Positive";

  // Priority detection
  let priority = "Low";
  if (lower.includes("urgent") || lower.includes("immediately") || lower.includes("accident")) priority = "High";
  else if (lower.includes("soon") || lower.includes("issue")) priority = "Medium";

  return { category, sentiment, priority };
};

module.exports = { analyzeGrievance };
