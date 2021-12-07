 const CollegeModel= require("../models/collegeModel.js")
 const InternModel = require("../models/internModel.js")
 
 const isValid = function(value) {
    if(typeof value === 'undefined' || value === null) return false
    if(typeof value === 'string' && value.trim().length === 0) return false
    return true;
}
const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0 
}

 const registerIntern = async function (req,res){
     try{
         const requestBody = req.body;
         if(!isValidRequestBody(requestBody)){
             res.status(400).send({status:false,message:'Invalid request parameters. Please provide intern details'})
         }
         //Extract params
         const {name,email,mobile,collegeName} = requestBody;
         // validation starts
         if(!isValid(name)){
            res.status(400).send({status: false, message: 'Name is required'})
            return
         }
         if(!isValid(email)){
            res.status(400).send({status: false, message: 'E-Mail is required'})
            return
         }
         
         //email validation

         if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            res.status(400).send({status: false, message: `Email should be a valid email address`})
            return
        }

         if(!isValid(mobile)){
            res.status(400).send({status: false, message: 'Mobile number is required'})
            return
         }

         //mobile validation
         if(!(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(mobile))){
            res.status(400).send({status: false, message: `Mobile number should be a valid email address`})
            return
        } 
         
         if(!isValid(collegeName)){
            res.status(400).send({status: false, message: 'collegeName is required'})
            return
         }

         const isEmailAlreadyUsed = await InternModel.findOne({email}); // {email: email} object shorthand property

         if(isEmailAlreadyUsed) {
             res.status(400).send({status: false, message: `${email} email address is already registered`})
             return
         }

         const isMobileAlreadyUsed = await InternModel.findOne({mobile}); // {email: email} object shorthand property

         if(isMobileAlreadyUsed) {
             res.status(400).send({status: false, message: `${mobile} mobile is already registered`})
             return
         }
         const collegeNames = req.body.collegeName
         const college = await CollegeModel.findOne({name:collegeNames}) 
        // console.log(college)
         const iD = college._id 
         console.log(requestBody)
          let collegeId = iD   //Mentor required 
         requestBody.collegeId = iD
         console.log(requestBody)

         const internData = {name,email,mobile,collegeId }
         const newIntern = await InternModel.create(internData)
 
         res.status(201).send({status: true,message: `Intern created successfully`,data:newIntern});
       }catch(error){
           res.status(500).send({status:false,message:error.message}) 
       }


     }

 
 module.exports={registerIntern}
