const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true,
        min: 1
    },
    category:{
        type: String,
        required : true
    },
    price: {
        type: Number,
        required : true,
        min: 1,
    },
    quantity: {
        type: Number,
        required : true,
        min:1
    },
     img: {
        type: String,
        required : true,
    },
     desc: {
        type: String,
        required : true,
    },
    user:{
        type: String,
        required:true
    }
}) 

module.exports = mongoose.model("Cart", CartSchema);