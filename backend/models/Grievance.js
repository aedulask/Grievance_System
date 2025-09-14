const mongoose = require("mongoose");

const grievanceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String },
    aadhaar: { type: String },
    category: { type: String },
    gmail: { type: String },
    mobile: { type: String },
    gender: { type: String },
    district: { type: String },
    pincode: { type: String },
    address: { type: String },
    description: { type: String, required: true },
    image: { type: String, default: null },
    status: { type: String, default: "Pending" },

    // AI fields for logs/debugging
    autoCategory: { type: String, default: "Other" },
    sentiment: { type: String, default: "Neutral" },
    priority: { type: String, default: "Low" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Grievance", grievanceSchema);
