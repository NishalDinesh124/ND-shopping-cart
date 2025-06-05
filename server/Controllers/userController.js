const Users = require('../Models/userModel')
const Cart = require('../Models/cartModel')
const Products = require('../Models/productsModel')
const Orders  = require('../Models/orderModel')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')

module.exports.login = async (req, res, next) => {
    try {
        const { username, email, password } = req.body.formData;
        const user = await Users.findOne({ email });
        if (!user)
            return res.json({ msg: "Invalid Email", status: false });
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid)
            return res.json({ msg: "Invalid Password", status: false });
        const userfilter = await Users.findOne({ email }).select("username email createdAt");
        delete user.password
        return res.json({ status: true, userfilter })
    } catch (err) {
        console.log("An error occured in user login", err);
    }
}

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body.formData;
        const emailCheck = await Users.findOne({ email });
        if (emailCheck)
            return res.json({ msg: "Email already exist", status: false });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.create({
            username,
            email,
            password: hashedPassword
        });
        const userfilter = await Users.findOne({ email }).select("username email");
        delete user.password;
        return res.json({ status: true, userfilter })
    } catch (err) {
        console.log("An error occured in user register", err);
    }
}


module.exports.getItems = async (req, res, next) => {
    try {
        const items = await Products.find();
        return res.json({ items })
    } catch (err) {
        console.log("An error occured while fetching items", err);

    }
}

module.exports.addToCart = async (req, res, next) => {
    try {
        const { name, category, price, img, desc } = req.body.product
        const user = req.body.user._id
        const existingItem = await Cart.findOne({ name, img, user })
        if (existingItem) {
            const newQty = existingItem.quantity + 1;
            await Cart.updateOne(
                { name, img, user },
                { $set: { quantity: newQty } }
            );
            return res.json({ msg: "Item updated", status: true })
        } else {
            const cartItems = await Cart.create({
                name,
                category,
                price,
                quantity: 1,
                img,
                desc,
                user
            })
            if (cartItems)
                return res.json({ msg: "Item added to cart", status: true })
        }

    } catch (err) {
        console.log("An error occured while adding to cart", err);

    }
}

module.exports.getCartItems = async (req, res, next) => {
    try {
        const user = req.body.user
        const items = await Cart.find({user});
        return res.json({ items })
    } catch (err) {
        console.log("An error occured while fetching cart items", err);

    }
}

module.exports.updateCart = async (req, res, next) => {
    try {
        const { itemId, userId, newQuantity} = req.body
        const objectId = new mongoose.Types.ObjectId(itemId);
        if (newQuantity <1) {
            await Cart.deleteOne({ _id: itemId, user: userId })
            return res.json({msg: "Item deleted from cart",status:true})
        } else {
            await Cart.updateOne(
                { _id: objectId, user: userId },
                { $set: { quantity: newQuantity } }
            );
            return true
        }
    } catch (err) {
        console.log("An error occured while updating cart items", err);

    }
}

module.exports.deleteCartItem = async (req, res, next) => {
    try {
        const {itemId, user} = req.body
         const objectId = new mongoose.Types.ObjectId(itemId);
        const item = await Cart.deleteOne({_id : objectId, user})
        res.json({msg: "Item deleted from cart", status: true})
    } catch (err) {
        console.log("An error occured while deleting cart item", err);

    }
}

module.exports.placeOrder= async (req, res, next) => {
    try {
        const{userId, products, address, paymentMethod} = req.body.orderData;
        await Orders.create({
            userId,
            products,
            address,
            paymentMethod
        })
        if(products.length>1){
            await Cart.deleteMany({user:userId})
        }
        return res.json({msg: "Order placed succesfully", status: true})    
    } catch (err) {
        console.log("An error occured while placing order", err);

    }
}
