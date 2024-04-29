const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    order: {type:String,required:true},
    date: {type:String,required:true},
    payment: {type:String,required:true},
    product: {type:String,required:true},
    customer: {type:String,required:true},
    phone: {type:String,required:true},
    weight: {type:String,required:true},
   
    
});

module.exports = mongoose.model('crud',orderSchema);