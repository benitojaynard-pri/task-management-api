const express = require("express");
const Post = require("../models/post");
const Notification = require("../models/notification");
const router = express.Router();

// Create post
router.post("/", async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get feed (simple version)
router.get("/", async (req, res) => {
  const posts = await Post.find()
    .populate("author", "name username")
    .sort({ createdAt: -1 });

  res.json(posts);
});

// Like / Unlike post
router.put("/:id/like", async (req, res) => {
  const { userId } = req.body;

  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const index = post.likes.indexOf(userId);
  if (index === -1) {
    post.likes.push(userId);
  
    if (post.author.toString() !== userId) {
      await Notification.create({
        user: post.author,
        type: "like",
        fromUser: userId,
        post: post._id
      });
    }
  } else {
    post.likes.splice(index, 1);
  }

  await post.save();
  res.json(post);
});

module.exports = router;