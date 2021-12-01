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


router.post('/createAuthor',Middleware.emailValidation, AuthorController.createAuthor);
router.post('/createBlogs',Middleware.checkAuthentication,BlogController.createBlogs)
router.get('/getBlog',Middleware.checkAuthentication,BlogController.getBlogs)
router.put('/updateBlog/:blogId',Middleware.checkAuthentication,BlogController.updateBlog)
router.delete('/blogs/:blogId',Middleware.checkAuthentication,BlogController.deleteBlogsWithId )
router.delete('/blogs',Middleware.checkAuthentication,BlogController.deleteBlogsWithQuery )
router.post('/login',AuthorController.login)

module.exports = router;