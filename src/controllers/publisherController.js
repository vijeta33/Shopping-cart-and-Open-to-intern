const BookModel= require("../models/bookModel.js")
const PublisherModel= require("../models/publisherModel.js")
const AuthorModel = require("../models/authorModel.js")


const createPublisher= async function (req, res){
    var data= req.body
    let savedData= await PublisherModel.create(data)
    res.send({msg: savedData})    
}

module.exports.createPublisher = createPublisher