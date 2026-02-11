const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    content: { type: String, required: true },

    images: [String],

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    commentsCount: { type: Number, default: 0 },

    privacy: {
      type: String,
      enum: ["public", "friends", "private"],
      default: "public"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);