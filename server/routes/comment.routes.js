const express = require("express");
const Comment = require("../models/comments");
const Notification = require("../models/notification");
const Post = require("../models/post");

const router = express.Router();

// Add comment
router.post("/", async (req, res) => {
  const comment = new Comment(req.body);
  await comment.save();

  await Post.findByIdAndUpdate(req.body.post, {
    $inc: { commentsCount: 1 }
  });

  if (comment.author.toString() !== post.author.toString()) {
    await Notification.create({
      user: post.author,
      type: "comment",
      fromUser: comment.author,
      post: post._id
    });
  }

  res.status(201).json(comment);
});

// Get comments per post
router.get("/:postId", async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate("author", "name username");

  res.json(comments);
});

module.exports = router;