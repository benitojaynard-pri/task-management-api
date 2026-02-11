const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token', 'userid'] 
}));
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/social_media")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Routes
app.use("/api/posts", require("./routes/post.routes"));
app.use("/api/comments", require("./routes/comment.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/notifications", require("./routes/notification.routes"));
app.use("/api/auth", require("./routes/auth.routes"));

app.get("/", (req, res) => {
  res.send("API running 🚀");
});

app.listen(5001, () =>
  console.log("Server running on http://localhost:5001")
);