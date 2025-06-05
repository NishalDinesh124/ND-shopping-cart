const Products = require('../Models/productsModel');
const Orders = require('../Models/orderModel')
const Admin = require('../Models/adminModel')
const Users = require('../Models/userModel')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')

module.exports.login = async (req, res, next) => {
    try {
        const { name, email, password } = req.body.formData;
        const admin = await Admin.findOne({ name,email });
        if (!admin)
            return res.json({ msg: "Invalid Username or Email", status: false });
        const isPasswordValid = await bcrypt.compare(password, admin.password)
        if (!isPasswordValid)
            return res.json({ msg: "Invalid Password", status: false });
        const adminfilter = await Admin.findOne({ email }).select("name email");
        delete admin.password 
        return res.json({ status: true, adminfilter })
    } catch (err) {
        console.log("An error occured in user login", err);
    }
}

// module.exports.register = async (req, res, next) => {
//     try {
//         console.log("Admin Register running");

//         const { name, email, password } = req.body.formData;
//         console.log(name);
        
//         const emailCheck = await Admin.findOne({ name,email });
//         if (emailCheck)
//             return res.json({ msg: "Email already exist", status: false });
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await Admin.create({
//             name,
//             email,
//             password: hashedPassword
//         });
//         delete user.password;
//         return res.json({ status: true, user })
//     } catch (err) {
//         console.log("An error occured in admin register", err);
//     }
// }

module.exports.addProducts = async (req, res, next) => {
    try {
        const { name, category, price, image, description } = req.body.formData
        const product = await Products.create({
            name: name,
            category: category,
            price: price,
            img: image,
            desc: description
        })
        res.json({ status: true }, product)
    } catch (err) {
        console.log("Error occured in adding products", err);

    }
}

module.exports.getProducts = async (req, res, next) => {
    try {
        const products = await Products.find()
        res.json(products)
    } catch (err) {
        console.log("Error occured in adding products", err);

    }
}
module.exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Orders.find()
        res.json(orders)
    } catch (err) {
        console.log("Error occured in adding products", err);
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await Users.find()
        res.json(users)
    } catch (err) {
        console.log("Error occured in adding products", err);
    }
}
module.exports.deleteUser = async (req, res, next) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.body.userId);
        console.log(req.body);
        console.log(userId);
        
        await Users.deleteOne({_id: userId})
        res.json({status:true})
    } catch (err) {
        console.log("Error occured in adding products", err);
    }
}