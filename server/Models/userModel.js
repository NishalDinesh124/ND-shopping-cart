const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username :{
        type: String,
        required : true,
        min : 3,
        max: 20,
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
  role: { 
    type: String, 
    default: "User" 
},
createdAt: {
    type: Date, 
    default: Date.now 
},
}) 

module.exports = mongoose.model("Users", UserSchema);