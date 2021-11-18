const BookModel= require("../models/bookModel.js")
const AuthorModel = require("../models/authorModel.js")
const AuthorController= require("../controllers/authorController")

//2.  Write a create book api that takes author from the request body.
//  You have to first check if this is a valid authorId. 
// A valid authorId is which is present in your authors collection. 

const createBook= async function (req, res){
    var data= req.body
    let check =  await AuthorModel.findOne({_id:req.body.author})
    if(check){
    let savedData= await BookModel.create(data)
    res.send({msg: savedData})    
    }
    else{
        res.send({msg: "valid authorId is not present"}) 
    }
}
    //3. Write a get books api that fetches all the books along with
    // their author details (you have to populate author)

   const listBook = async function (req,res){
       let books= await BookModel.find().populate('author')
       res.send({msg: books})
   }

   
    



module.exports.createBook = createBook
module.exports.listBook = listBook
