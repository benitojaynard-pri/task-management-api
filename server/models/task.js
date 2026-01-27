const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true, minlength: 3 },
  completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Task', TaskSchema);