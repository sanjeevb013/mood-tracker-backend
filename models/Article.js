const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  datePublished: {
    type: Date,
    required: true,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Article', articleSchema);