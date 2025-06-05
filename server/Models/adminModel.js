const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name :{
        type: String,
        required : true,
        min : 3,
        max: 20,
        unique: true
    },
    email:{
        type: String,
        required : true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required : true,
        min: 5,
    },
}) 

module.exports = mongoose.model("Admins", AdminSchema);