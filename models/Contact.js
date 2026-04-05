const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    message:{
        type:String,
        required:true,
        maxLength:500,
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Contact',contactSchema);