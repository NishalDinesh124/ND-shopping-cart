const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
 userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      category : String,
      price: Number,
      quantity: Number,
      img: String,
      desc: String
    },
  ],
  address: {type: Object, required: true},
  paymentMethod: String, // "COD" or "Online"
  paymentId : String,
  status: { type: String, default: "Pending" },
  orderedAt: { type: Date, default: Date.now },
}) 

module.exports = mongoose.model("Orders", OrdersSchema);