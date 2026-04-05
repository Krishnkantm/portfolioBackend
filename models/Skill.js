const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   level:{
    type:String,
    required:true
   },
   icon:{
    type:String,
   }
},{
    timeStamps:true
});

module.exports = mongoose.model('Skill',skillSchema);