const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    navitem:{type:String,required:true},

});

module.exports = mongoose.model('nav',userSchema);