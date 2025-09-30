const mongoose = require('mongoose');

const ContentBlockSchema = new mongoose.Schema({
  header: { type: String, required: true },
  paragraphs: [{ type: String }],
   bulletPoints: [{ type: String }]
});


const ArticleDetailSchema = new mongoose.Schema({
     articleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article', // This should match the model name of your lightweight Article schema
    required: true
  },
  title: { type: String, required: true },
  description: { type: String },
  author: { type: String },
  image: { type: String,required: true},
  date: { type: Date, default: Date.now },
  content: [ContentBlockSchema]
});

module.exports = mongoose.model('ArticleDetail', ArticleDetailSchema);