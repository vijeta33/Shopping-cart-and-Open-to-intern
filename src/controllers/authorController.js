const AuthorModel= require("../models/authorModel.js")
const BookModel= require("../models/blogModel.js")


const createAuthor= async function (req, res){
    try{
    let data= req.body
    
    let savedData= await AuthorModel.create(data)
    res.status(200).send({msg: savedData})
    }catch(err){
        res.status(400).send({msg : "Bad request"})
    }

}


module.exports.createAuthor= createAuthor
