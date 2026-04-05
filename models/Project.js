const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        type:String
    },
    video:{
        type:String
    },
    demonLink:{
        type:String,
        default:'#'
    },
    order:{
        type:Number,
        default: 0
    }
},{
    timestamps:true
});

module.exports = mongoose.model('Project',projectSchema);