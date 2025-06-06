const express = require("express");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const router = express.Router();

const razorpay = new Razorpay({
  key_id: "rzp_test_h8KeIrbipUT13H",
  key_secret: "cGiCy5SeWtkIciGW98fnMi1J",
});

router.post("/create-order", async (req, res) => {
  const payment_capture = 1;
  const amount = req.body.amount; // in rupees
  const currency = "INR";

  const options = {
    amount: amount * 100, // convert to paisa
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
