const Certificate = require('../models/Certificate.js');
const cloudinary = require('../utlis/cloudinary.js');
const fs = require('fs');

//create certificate
const createCertificate = async (req,res)=>{
    try{
       
       const {title,issuer,date,certificateUrl} = req.body; 

       let fileUrl = "";

       //if exists
       if(req.file){
          const result = await cloudinary.uploader.upload(req.file.path,{
            resource_type:"auto"
          });

          fileUrl = result.secure_url;
          fs.unlinkSync(req.file.path);
       }

       if(!fileUrl || certificateUrl){
        fileUrl = certificateUrl;
       }

       const newCertificate = await Certificate.create({
         title,
         issuer,
         date,
         certificateUrl :fileUrl
       });

       res.status(201).json({
        success:true,
        message:"Certificate added sucessfully",
        data : newCertificate
       });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};

//get all certificate
const getCertificates = async (req,res)=>{
    try{
       const result = await Certificate.find().sort({createdAt: -1});

       res.status(200).json({
         success:true,
         data:result
       });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};

//delete certificate
const deleteCertificate = async (req,res)=>{
    try{
      const cert = await Certificate.findByIdAndDelete(req.params.id);

      if(!cert){
        return res.status(404).json({
            message:"Certificate not found"
        });
      }

      res.status(200).json({
       message:"Deleted Sucessfully"
      });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};

module.exports = {createCertificate,getCertificates,deleteCertificate};