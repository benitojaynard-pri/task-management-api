const express = require("express");
const Notification = require("../models/notification");

const router = express.Router();

// Get notifications for a user
router.get("/:userId", async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.params.userId })
      .populate("fromUser", "name username")
      .populate("post", "content")
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark notification as read
router.put("/:id/read", async (req, res) => {
  try {
    const notif = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    res.json(notif);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;