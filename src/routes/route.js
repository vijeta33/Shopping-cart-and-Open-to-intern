const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel")
const BookModel= require("../models/bookModel")
const AuthorModel= require("../models/authorModel")

const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")
const AuthorController= require("../controllers/authorController")


router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

router.post('/createUser',  UserController.createUser  );
router.get('/getAllUsers',  UserController.getUsersData  );
router.post('/createAuthor', AuthorController.createAuthor);
router.post('/createBook', BookController.createBook);
router.get('/listBook', BookController.listBook);
module.exports = router;