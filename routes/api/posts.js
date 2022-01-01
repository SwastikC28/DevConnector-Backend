const express = require("express");
const router = express.Router();

// @route  GEt api/posts
// @desc   Test Route
// @access Public
router.get("/", (req, res) => {
  res.send("Post Route");
});

module.exports = router;
