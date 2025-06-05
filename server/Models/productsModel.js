const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true,
         min : 1
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
     img: {
        type: String,
        required : true,
    },
     desc: {
        type: String,
        required : true,
    }
}) 

module.exports = mongoose.model("Products", ProductsSchema);