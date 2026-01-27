const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token', 'userid', 'isadmin'] 
}));

app.use(express.json());

// MongoDB connection
mongoose
  .connect('mongodb://localhost:27017/taskDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schemas & Models
const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  isAdmin: Boolean
});

const TaskSchema = new mongoose.Schema({
  title: String,
  userId: String,
  completed: { type: Boolean, default: false } // New field
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

// POST /api/auth (Login)
app.post('/api/auth', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Find user by username
    const user = await User.findOne({ username });

    // 2. Check if user exists and password matches
    // Note: In production, never store or compare passwords in plain text!
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // 3. Return user data (excluding password for security)
    res.json({
      _id: user._id,
      name: user.name, // <--- Send the name back to the frontend
      username: user.username,
      isAdmin: user.isAdmin,
      message: 'Login successful'
    });

  } catch (err) {
    res.status(500).json({ error: 'Server error' });
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
    if (!isAdmin) return res.status(403).json({ message: 'Access denied' });

    // Fetch all tasks and all users
    const tasks = await Task.find({});
    const users = await User.find({}, 'name _id');

    // Map the user name to each task
    const tasksWithNames = tasks.map(task => {
      const owner = users.find(u => u._id.toString() === task.userId);
      return {
        ...task._doc,
        assignedToName: owner ? owner.name : "Unknown User"
      };
    });

    res.json(tasksWithNames);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/add', async (req, res) => {
  try {
    const { title, userId } = req.body;

    if (!title || !userId) {
      return res.status(400).json({ error: "Title and UserID are required" });
    }

    const newTask = new Task({ title, userId });
    await newTask.save();

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/tasks/:id
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/tasks/:id (Edit)
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id, 
      { title: req.body.title }, 
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/tasks/:id/toggle', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.completed = !task.completed; // Flip the status
    await task.save();
    
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ... existing imports ...

// UPDATED: GET /api/tasks/all (Admin only)


// Start server (macOS-safe port)
app.listen(5001, () => {
  console.log('Server running on http://localhost:5001');
});