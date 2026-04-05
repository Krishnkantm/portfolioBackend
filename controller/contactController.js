const Contact = require('../models/Contact.js');

const saveContact = async(req,res)=>{
    try{
       const {name, email, message} = req.body;
       
       //validation
       if(!name?.trim() || !email?.trim() || !message){
         return res.status(400).json({
            sucess:false,
            message:"All field are required"
         })
       }

       //save to db
       const newContact = await Contact.create({
        name,
        email,
        message
       });

        res.status(201).json({
        sucess:true,
        message:"Message  saved sucessfully",
        data:newContact
       })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"server error",
            error:err.message
        });
    }
};

const getContacts = async (req, res) => {
  try {
    const data = await Contact.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Contact not found"
      });
    }

    res.json({
      success: true,
      message: "Contact deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = {saveContact,getContacts,deleteContact};