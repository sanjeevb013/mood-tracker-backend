const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  date: { type: String, required: true },
  mood: { type: Number, required: true },
  notes: { type: String },
  tags: [String],
  timestamp: { type: Date, default: Date.now }
}, { collection: 'moodTrackerData' }); // 👈 Explicitly set collection name

module.exports = mongoose.model('Mood', moodSchema);