const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    name:String,
    title:String,
    about:String,
    email:String,
    phone:String,
    services:[String],
    experience:Number,
    projects:Number,
    companies:Number,
    image:String,
});

module.exports = mongoose.model('Profile',profileSchema);