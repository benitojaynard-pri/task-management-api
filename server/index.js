const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect('mongodb://localhost:27017/taskDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schemas & Models
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  isAdmin: Boolean
});

const TaskSchema = new mongoose.Schema({
  title: String,
  userId: String
});

const User = mongoose.model('User', UserSchema);
const Task = mongoose.model('Task', TaskSchema);

// Test route
app.get('/', (req, res) => {
  res.send('API is running on port 5001 🚀');
});

// POST /api/users (Register)
app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User Created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/tasks (Current User Tasks)
app.get('/api/tasks', async (req, res) => {
  try {
    const userId = req.headers.userid;
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/tasks/all (Admin only)
app.get('/api/tasks/all', async (req, res) => {
  try {
    const isAdmin = req.headers.isadmin === 'true';

    if (!isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const tasks = await Task.find({});
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server (macOS-safe port)
app.listen(5001, () => {
  console.log('Server running on http://localhost:5001');
});