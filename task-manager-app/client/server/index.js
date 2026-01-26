const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/taskDB');

// --- API Implementation ---

// POST /api/users (Register)
app.post('/api/users', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).send("User Created");
});

// GET /api/tasks (Current User Tasks)
app.get('/api/tasks', async (req, res) => {
  // Logic: Use JWT token (req.user.id) to find tasks
  const tasks = await Task.find({ userId: req.headers.userid });
  res.json(tasks);
});

// GET /api/tasks/all (Admin only)
app.get('/api/tasks/all', async (req, res) => {
  // Logic: Check if req.headers.isadmin === 'true'
  const tasks = await Task.find({});
  res.json(tasks);
});

app.listen(5000, () => console.log('Server running on port 5000'));