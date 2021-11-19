const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel")
const BookModel= require("../models/bookModel")
const AuthorModel= require("../models/authorModel")
const PublisherModel= require("../models/publisherModel")

const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")
const AuthorController= require("../controllers/authorController")
const PublisherController= require("../controllers/publisherController")


router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

router.post('/createUser',  UserController.createUser  );
router.get('/getAllUsers',  UserController.getUsersData  );
router.post('/createAuthor', AuthorController.createAuthor);
router.post('/createBook', BookController.createBook);
router.get('/listBook', BookController.listBook);
router.post('/createPublisher', PublisherController.createPublisher);
router.get('/listBook2', BookController.listBook2);
module.exports = router;