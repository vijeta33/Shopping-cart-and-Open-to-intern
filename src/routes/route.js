const express = require('express');
const router = express.Router();

const BlogModel= require("../models/blogModel")
const AuthorModel= require("../models/authorModel")
const AuthorController = require("../controllers/authorController")
const Middleware = require("../middlewares/middleware.js")
const BlogController = require("../controllers/blogController")







router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});


router.post('/createAuthor',Middleware.validation, AuthorController.createAuthor);
router.post('/createBlogs',BlogController.createBlogs)
router.get('/getBlog',BlogController.getBlog)
router.put('/updateBlog/:blogId',BlogController.updateBlog)
router.delete('/blogs/:blogId',BlogController.deleteBlogsWithId )
router.delete('/blogs',BlogController.deleteBlogsWithQuery )

module.exports = router;