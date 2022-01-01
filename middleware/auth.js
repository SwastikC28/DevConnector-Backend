const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if token doesnt Exit
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied ." });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
  } catch (error) {
    res.status(401).json({ msg: "Token is not Valid" });
  }
  next();
};
