const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

const JWT_SECRET = "supersecretkey"; // move to .env later
const JWT_EXPIRES_IN = "7d";

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    
    }

    // 2. Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username" });
    
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
      
    
    }

    // 4. Create token
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // 5. Send response
    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        profilePicture: user.profilePicture,
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    console.log("error", err.message);
    
  }
});

module.exports = router;