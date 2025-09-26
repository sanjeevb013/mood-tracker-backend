const express= require("express");
const router=express.Router()
const {addBlog}=require('../controllers/articleController');

router.post('/add-article',addBlog);

module.exports= router;