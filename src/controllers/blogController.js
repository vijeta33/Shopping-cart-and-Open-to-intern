const BlogModel= require("../models/blogModel.js")
const AuthorModel = require("../models/authorModel.js")

//***********************CREATTE BLOG*********************************/
const createBlogs = async function (req, res) {
    try {
        let data = req.body
        if (data.isPublished == true) {
           
            data["publishedAt"] = new Date()
            // console.log(data);
        }
        //console.log(typeof data.isPublished)
      let authorId = req.body.authorId;
     // console.log(authorId)
    const authorDetail = await AuthorModel.findById(authorId);
    if (authorDetail) {
      let savedData = await BlogModel.create(data);
      res.status(201).send({ status: true, data: savedData });
    } else {
      res.status(400).send({ status: false, mg: "Invalid Request" });
    }
  } catch (error) {
    res.status(500).send({ message: "failed", error: error.message });
  }
};
//************************ GET BLOG.*************************************
const getBlog = async function (req, res) {
    try {
      const irs= await BlogModel.find(
        { isDeleted: false ,
         isPublished: true }
      );
        if (irs) {
            let authorId = req.query.authorId;
           // console.log(authorId);
            let cat = req.query.category;
           // console.log(cat);
            let tag = req.query.tags;
            let sub = req.query.subcategory;
            let arr = [];
            for (let i = 0; i < irs.length; i++) {
               // console.log("Hii",i)
                if (irs[i].authorId == authorId || irs[i].category.filter(x=> x==cat)== cat || irs[i].tags.filter(x=> x==tag) == tag || irs[i].subcategory.filter(x=> x==sub)==sub)
                    arr.push(irs[i]);
        
            }
            res.status(200).send({ data: arr });
            //  res.status(200).send({ status: true, data: { irs } });
        }
        else {
            res.status(404).send({ status: false, mg: "#error-response-structure" });
  
        }
    } catch (err) {
        console.log(err)
      res.status(500).send({ status: false, msg: "No blogs found" });
    }
  };

//*************************************4. Put Api***************************** */
    
  
const updateBlog = async function (req, res) {
    try {
  
      let blogId = req.params.blogId
      let newTitle = req.body.title
      let newBody = req.body.body
      let newTags = req.body.tags
      let newSubCategory = req.body.subcategory
    
      let data = await BlogModel.findOne({ _id: blogId })
      
     
      if (data.isDeleted == false && data) {
        let updatedSubCategory = data["subcategory"].concat(newSubCategory) 
        console.log(updatedSubCategory)
        let updatedTag = data["tags"].concat(newTags)
        console.log(updatedTag)
        let updatedata = await BlogModel.findOneAndUpdate({ _id: blogId }, { title: newTitle, body: newBody, tags: updatedTag, subCategory: updatedSubCategory, publishedAt: new Date(), isPublished: true }, { new: true });
        res.status(200).send({ msg: "successfully updated", data: updatedata })
      }
      else {
        res.status(404).send({ msg: "data not found" })
      }
      
    }catch(error) {
        console.log(error)
      res.status(500).send({ message: "failed", error: error.message })
    }
  };
  
  
  //---------------------------------5th-DELETE BLOG WITH ID------------------------------------------------------------------------
  const deleteBlogsWithId = async function (req, res) {
    try {
      const blogId = req.params.blogId;
      const blogDetail = await BlogModel.findById(blogId);
      console.log(blogDetail)
      
      if (blogDetail && blogDetail.isDeleted == false) {
  
        let deletedBlog = await BlogModel.findOneAndUpdate({ _id: blogId }, { isDeleted: true, deletedAt: new Date() }, { new: true });
  
        res.status(200).send()
      } else {
        res.status(404).send({ status: false, msg: "Blog with this blog id doesn't exist" });
      }
      
    } catch (error) {
      res.status(500).send({ message: "failed", error: error.message });
    }
  
  };
  
  
  
  //----------------------------6th-DELETE BLOG WITH QUERY-----------------------------------------------------------------------------
  const deleteBlogsWithQuery = async function (req, res) {
    try {
      let deletedBlog;
      const irs = await BlogModel.find({ isDeleted: false });
      //console.log(irs);
      if (irs) {
  
        let authorId = req.query.authorId;
        let cat = req.query.category;
        console.log(cat)
        let tag = req.query.tags;
        let pub = req.query.isPublished;
        let sub = req.query.subcategory;
  
        for (let i = 0; i < irs.length; i++) {
          if (irs[i].authorId == authorId || irs[i].category.filter(x => x == cat) == cat || irs[i].tags.filter(x => x == tag) == tag || irs[i].subcategory.filter(x => x == sub) == sub || irs[i].isPublished == pub) {
            deletedBlog = await BlogModel.findOneAndUpdate({ _id: irs[i]["_id"] }, { isDeleted: true, deletedAt: new Date() }, { new: true });
          }
        }
      }
      if (deletedBlog) {
  
  
        res.status(200).send({ status: true, data: deletedBlog });
      }
      else {
        res.status(404).send({ status: false, msg: "No blogs found" });
      }
    } catch (error) {
      res.status(500).send({ message: "failed", error: error.message })
    }
  }
  
  


module.exports={createBlogs,getBlog,updateBlog,deleteBlogsWithId,deleteBlogsWithQuery}
