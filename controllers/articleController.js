const Article = require('../models/Article');
const ArticleDetail = require('../models/ArticleData');
const path = require("path");

const getBlog = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;       // Default to page 1
    const limit = parseInt(req.query.limit) || 10;    // Default to 10 articles per page
    const skip = (page - 1) * limit;

    const total = await Article.countDocuments();     // Total number of articles
    const articles = await Article.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });                       // Optional: sort by newest first

    res.status(200).json({
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalArticles: total,
      articles,
    });
  } catch (err) {
    next(err);
  }
};

const addArticleDetail = async (req, res) => {
  try {
    const { title, description, author, date, content } = req.body;

    // ✅ Step 1: Handle uploaded image (multer gives req.file)
    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // ✅ Step 2: Save lightweight Article
    const newArticle = new Article({
      title,
      description,
      author,
      datePublished: date || Date.now(),
      image: imageUrl,
    });

    const savedArticle = await newArticle.save();

    // ✅ Step 3: Save full ArticleDetail linked to Article
    const newArticleDetail = new ArticleDetail({
      articleId: savedArticle._id,
      title,
      description,
      author,
      date: date || Date.now(),
      content, // must be array of content blocks { header, paragraphs, bulletPoints }
      image: imageUrl,
    });

    const savedDetail = await newArticleDetail.save();

    res.status(201).json({
      success: true,
      message: "Article and detail saved successfully",
      article: savedArticle,
      detail: savedDetail,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save article and detail",
      error: error.message,
    });
  }
};

module.exports = { addArticleDetail };

const getArticleDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const detail = await ArticleDetail.findOne({articleId:id}).populate({
      path: 'articleId',
      select: '-__v -createdAt -updatedAt' // optional: exclude metadata
    });

    if (!detail) {
      return res.status(404).json({
        success: false,
        message: 'Article detail not found'
      });
    }

    res.status(200).json({
      success: true,
      data: detail
    });
  } catch (error) {
    console.error('Error fetching article detail:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};



module.exports={getBlog, addArticleDetail, getArticleDetail}