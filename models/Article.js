const mongoose = require('mongoose');
const slugify = require('slugify');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
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
  }
}, {
  timestamps: true,
});

// Pre-save hook to auto-generate slug
articleSchema.pre('save', function(next) {
  if (!this.slug) {
    // Generate slug from title
    this.slug = slugify(this.title, { lower: true, strict: true });
    
    // Append timestamp to ensure uniqueness
    this.slug += '-' + Date.now();
  }
  next();
});

module.exports = mongoose.model('Article', articleSchema);
