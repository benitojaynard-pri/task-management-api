const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  role: { type: String, default: 'Architect' },
  nexusScore: { type: Number, default: 50 },
  growthMetrics: [Number], // For the sparkline graph
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  professionalSummary: {
    headline: String,
    image: String, // Urban living image URL
    content: String
  }
});

module.exports = mongoose.model('User', UserSchema);
