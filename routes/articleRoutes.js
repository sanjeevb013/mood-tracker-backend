const express= require("express");
const router=express.Router()
const {addArticleDetail, getBlog, getArticleDetail}=require('../controllers/articleController');
const upload = require("../middlewares/multerConfig");
const parseFormDataJSON = require("../middlewares/parseFormData");

router.get('/get-article', getBlog);
router.post('/add-article',upload.single("image"), parseFormDataJSON, addArticleDetail);
router.get('/main-article/:id', getArticleDetail);

module.exports= router;