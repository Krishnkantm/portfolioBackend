const mongoose = require('mongoose')

const certificateSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    issuer:{
        type:String,
        required:true
    },
    date:{
        type:String
    },
    certificateUrl:{
        type:String,
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Certificate',certificateSchema);