const BookModel= require("../models/bookModel.js")
const AuthorModel = require("../models/authorModel.js")

const createBook= async function (req, res){
    var data= req.body
    let savedData= await BookModel.create(data)
    res.send({msg: savedData})    
}
const getBook = async function (req,res){
    let books = await BookModel.findOne({name : "Two states"}).select({author_id:1,_id:0})
    console.log(books)
    let book = await AuthorModel.find(books).select({author_name:1,_id:0})
    console.log(book)
    let savedData = await BookModel.findOneAndUpdate({name : "Two states"},{price :100},{new:true}).select({price:1,_id:0})
    res.send({msg :savedData, book })
}
//Find the books which costs between 50-100(50,100 inclusive) and respond back with the author names of respective books
const findBook = async function (req,res){
    let books = await BookModel.find({price: {$gt:49,$lt:101 } }).select({author_id:1,_id:0})
    console.log(books)
    let book = await AuthorModel.find({$or:books}).select({author_name:1,_id:0})
    console.log(book)
    res.send({msg : book })
}


module.exports={ createBook,getBook,findBook}
