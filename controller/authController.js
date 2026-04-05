const Admin = require('../models/Admin.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const loginAdmin = async (req,res)=>{
    try{
      const {email,password} = req.body;

      const admin = await Admin.findOne({email: email.trim().toLowerCase()});

      if(!admin){
         return res.status(400).json({
            message: "Invalid email"
         });
      }

      const isMatch = await bcrypt.compare(password,admin.password);
      
      if(!isMatch){
        return res.status(400).json({
            message:"Invalid Password"
        })
      }

      const token = jwt.sign(
        {id : admin._id},
        process.env.JWT_SECRET,
        {expiresIn: "4d"}
      );

      res.status(201).json({
        success : true,
        token
      });
      
    }
    catch(err){
       res.status(500).json({
        message: err.message
       });
    }
};

module.exports = {loginAdmin};