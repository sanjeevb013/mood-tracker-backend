const Article = require('../models/Article');

 const addBlog = async(req, res,next)=>{
    try{
         console.log(req.body,"sss")
    const addArticle = new Article(req.body);
    const add=await addArticle.save();
    res.status(201).json(addArticle);
    console.log(addArticle,"article")
    }
    catch(err){
       next(err) 
    }
}

module.exports={addBlog}