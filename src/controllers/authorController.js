const AuthorModel= require("../models/authorModel.js")
const BookModel= require("../models/bookModel.js")
const createAuthor= async function (req, res){
    var data= req.body
    let savedData= await AuthorModel.create(data)
    res.send({msg: savedData})    
}
const getAuthor = async function (req,res){
    let books = await AuthorModel.findOne({author_name: "Chetan Bhagat"}).select({author_id :1, _id:0})
    console.log(books)
    let book =  await BookModel.find(books).select({name:1,_id:0})
    console.log(book)
    res.send({msg :book })
}

module.exports.createAuthor= createAuthor
module.exports.getAuthor= getAuthor