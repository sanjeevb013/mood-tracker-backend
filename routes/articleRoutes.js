const express= require("express");
const router=express.Router()
const {articleDetail, getBlog, getArticleDetail}=require('../controllers/articleController');

router.get('/get-article', getBlog);
router.post('/add-article', articleDetail);
router.get('/main-article/:id', getArticleDetail);

module.exports= router;