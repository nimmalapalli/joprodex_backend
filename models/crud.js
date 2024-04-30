const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderId: {
        type: Number,
        required: true
    },
    orderType: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true
    }
});

const Crud = mongoose.model('crud', orderSchema);

module.exports = Crud;
