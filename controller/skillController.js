const Skill = require('../models/Skill.js');
const cloudinary = require('../utlis/cloudinary.js');

//add skill
const addSkill = async (req,res)=>{
    try{
       const {name,level} = req.body;
       
       let iconUrl = "";
       
       if(req.file){
         const result = await cloudinary.uploader.upload(req.file.path,{
             resource_type : "auto"
         });
         
         iconUrl = result.secure_url;
       }

       const new_data = await Skill.create({
        name,
        level,
        icon:iconUrl
       });

       res.status(201).json({
        success:true,
        data:new_data
       });

    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};

//get skill
const getSkills = async (req,res)=>{
    try{
      const skills = await Skill.find().sort({createdAt:-1}).lean();

      res.json({
        success:true,
        data : skills
      })
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

const deleteSkill = async (req,res)=>{
    try{
        await Skill.findByIdAndDelete(req.params.id);

       res.json({
        message:"deleted sucessfully"
       });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};

module.exports = {addSkill,getSkills,deleteSkill}