const AuthorModel= require("../models/authorModel.js")
const BookModel= require("../models/bookModel.js")

// 1. Write a create author api that creates an author from the details in request body

const createAuthor= async function (req, res){
    var data= req.body
    let savedData= await AuthorModel.create(data)
    res.send({msg: savedData})    
}


module.exports.createAuthor= createAuthor
