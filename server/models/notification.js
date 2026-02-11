const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    // Who receives the notification
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // What kind of event triggered it
    type: {
      type: String,
      enum: ["like", "comment", "friend_request", "friend_accept"],
      required: true
    },

    // Who triggered the event
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Optional: related post
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    },

    isRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);