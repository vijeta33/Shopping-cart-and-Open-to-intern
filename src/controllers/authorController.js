const AuthorModel= require("../models/authorModel.js")
const BookModel= require("../models/blogModel.js")
const Jwt = require("jsonwebtoken")

const createAuthor= async function (req, res){
    try{
    let data= req.body
    
    let savedData= await AuthorModel.create(data)
    res.status(200).send({msg: savedData})
    }catch(err){
        res.status(400).send({msg : "Bad request"})
    }

}
//***********************************Login Api (7)****************************/
const login = async function (req, res){
    try{
        let authorEmail = req.body.email
        let authorPassword = req.body.authorPassword

        let credentials = await AuthorModel.findOne({email:authorEmail,password:authorPassword})
        if(credentials){
            let payload = {authorId: credentials._id}
            let token = Jwt.sign(payload,"radiumIrs")
            res.status(200).send({status:true,data:credentials._id,token:token})
        }else{
            res.status(400).send({msg:"Invalid credentials"})
        }

        }catch(error){
            res.status(500).send({status:false,msg:error.message})
        }
    }

    module.exports={createAuthor,login}














    



