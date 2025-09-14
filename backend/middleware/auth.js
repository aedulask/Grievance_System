// backend/middleware/auth.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  try {
    // Token expected as "Bearer <token>" in Authorization header
    const header = req.header("Authorization");
    if (!header) return res.status(401).json({ error: "No token, authorization denied" });

    const token = header.replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: "No token, authorization denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role, iat, exp }
    return next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    return res.status(401).json({ error: "Token is not valid" });
  }
};

module.exports = auth;
