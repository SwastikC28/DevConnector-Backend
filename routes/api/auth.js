const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

// @route  Get api/auth
// @desc   Test Route
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @route  Get api/auth
// @desc   Authenticate User and get Token
// @access Public
router.post(
  "/",
  [
    check("email", "Please include a Valid Email").isEmail(),
    check("password", "Password is Required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      // If no User
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await user.checkPassword(password);
      console.log(isMatch);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const token = user.getJWTSignedToken({
        user: {
          id: user.id,
        },
      });

      res
        .status(200)
        .json({ success: true, msg: "User Logged in Successfully", token });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
