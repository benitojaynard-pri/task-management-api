const express = require("express");
const User = require("../models/user");
const Notification = require("../models/notification");
const router = express.Router();
const bcrypt = require("bcryptjs");

// REGISTER
router.post("/", async (req, res) => {
  try {
    // 1. Pull needed fields from req.body
    const {
      name,
      username,
      email,
      mobileNumber,
      password,
      birthdate
    } = req.body;

    console.log("parameters:", req.body);

    // 2. Validate required fields
    if (!name || !username || !password || !birthdate) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    // 3. Enforce email OR mobile number
    if (!email && !mobileNumber) {
      return res.status(400).json({
        message: "Email or mobile number is required"
      });
    }

    // 4. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Create user
    const user = new User({
      name,
      username,
      email,
      mobileNumber,
      birthdate,
      password: hashedPassword
    });

    // 6. Save user
    await user.save();

    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ error: err.message });
  }
});


// Send friend request
router.put("/:id/add-friend", async (req, res) => {
  const { userId } = req.body;

  await User.findByIdAndUpdate(userId, {
    $push: { "friendRequests.sent": req.params.id }
  });

  await User.findByIdAndUpdate(req.params.id, {
    $push: { "friendRequests.received": userId }
  });

  await Notification.create({
    user: req.params.id,
    type: "friend_request",
    fromUser: userId
  });

  res.json({ message: "Friend request sent" });
});

// Accept friend request
router.put("/:id/accept-friend", async (req, res) => {
  const { userId } = req.body;

  await User.findByIdAndUpdate(userId, {
    $pull: { "friendRequests.sent": req.params.id },
    $push: { friends: req.params.id }
  });

  await User.findByIdAndUpdate(req.params.id, {
    $pull: { "friendRequests.received": userId },
    $push: { friends: userId }
  });

  await Notification.create({
    user: req.params.id,
    type: "friend_accept",
    fromUser: userId
  });

  res.json({ message: "Friend added" });
});

module.exports = router;