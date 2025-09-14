const Grievance = require("../models/Grievance");
const { analyzeGrievance } = require("../services/aiService");

/**
 * Create a new grievance
 */
const createGrievance = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const {
      name,
      aadhaar,
      category,
      gmail,
      mobile,
      gender,
      district,
      pincode,
      address,
      description,
    } = req.body;

    // Run AI analysis
    let aiResult = { category: "Other", sentiment: "Neutral", priority: "Low" };
    try {
      aiResult = await analyzeGrievance(description || "");
    } catch (e) {
      console.warn("AI analyze failed; using fallback:", e?.message || e);
    }

    // Merge AI category into main category
    const finalCategory =
      category && category.trim() !== "" ? category : aiResult.category || "Other";

    const grievance = new Grievance({
      userId: req.user.id,
      name: name || undefined,
      aadhaar: aadhaar || undefined,
      category: finalCategory, // <-- merged category
      gmail: gmail || undefined,
      mobile: mobile || undefined,
      gender: gender || undefined,
      district: district || undefined,
      pincode: pincode || undefined,
      address: address || undefined,
      description: description || "",
      image: req.file ? req.file.filename : null,
      autoCategory: aiResult.category || "Other", // stored only for debugging
      sentiment: aiResult.sentiment || "Neutral",
      priority: aiResult.priority || "Low",
    });

    await grievance.save();
    return res.status(201).json(grievance);
  } catch (err) {
    console.error("createGrievance error:", err);
    return res.status(500).json({ error: "Server error while creating grievance" });
  }
};

/**
 * Get grievances (role-aware)
 */
const getGrievances = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const query = req.user.role === "panchayat-officer" ? {} : { userId: req.user.id };
    const grievances = await Grievance.find(query).sort({ createdAt: -1 });
    res.json(grievances);
  } catch (err) {
    console.error("getGrievances error:", err);
    res.status(500).json({ error: "Server error while fetching grievances" });
  }
};

/**
 * Get completed grievances
 */
const getCompletedGrievances = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const baseQuery = req.user.role === "panchayat-officer" ? {} : { userId: req.user.id };
    const grievances = await Grievance.find({
      ...baseQuery,
      status: "Resolved",
    }).sort({ createdAt: -1 });

    res.json(grievances);
  } catch (err) {
    console.error("getCompletedGrievances error:", err);
    res.status(500).json({ error: "Server error while fetching completed grievances" });
  }
};

/**
 * Get ongoing grievances
 */
const getOngoingGrievances = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const baseQuery = req.user.role === "panchayat-officer" ? {} : { userId: req.user.id };
    const grievances = await Grievance.find({
      ...baseQuery,
      status: { $ne: "Resolved" },
    }).sort({ createdAt: -1 });

    res.json(grievances);
  } catch (err) {
    console.error("getOngoingGrievances error:", err);
    res.status(500).json({ error: "Server error while fetching ongoing grievances" });
  }
};

/**
 * Update grievance status (Resolve / Endorse)
 */
const updateGrievanceStatus = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const { status } = req.body;

    if (req.user.role !== "panchayat-officer") {
      return res.status(403).json({ error: "Forbidden: only officers can update status" });
    }

    const grievance = await Grievance.findById(id);
    if (!grievance) return res.status(404).json({ error: "Grievance not found" });

    const validStatuses = ["Pending", "Endorsed", "In Progress", "Resolved"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    grievance.status = status;
    await grievance.save();

    res.json(grievance);
  } catch (err) {
    console.error("updateGrievanceStatus error:", err);
    res.status(500).json({ error: "Server error while updating status" });
  }
};

module.exports = {
  createGrievance,
  getGrievances,
  getCompletedGrievances,
  getOngoingGrievances,
  updateGrievanceStatus,
};
