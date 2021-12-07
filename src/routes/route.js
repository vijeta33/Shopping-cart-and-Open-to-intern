const express = require('express');
const router = express.Router();


const CollegeController = require("../controllers/collegeController")
const InternController = require("../controllers/internController")








router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});


router.post('/colleges',CollegeController.registerCollege);
router.post('/interns',InternController.registerIntern);
router.get('/collegeDetails',CollegeController.collegeDetails);


module.exports = router;