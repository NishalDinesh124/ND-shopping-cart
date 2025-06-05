
const {login,register, getItems, addToCart, updateCart, getCartItems, deleteCartItem, placeOrder} = require('../Controllers/userController')
const router = require('express').Router();

router.post("/login", login);
router.post("/register", register)
router.post('/add-to-cart', addToCart)
router.post('/get-cart-items', getCartItems)
router.post('/update-cart', updateCart)
router.post('/delete-cart', deleteCartItem)
router.get('/get-items', getItems)
router.post('/place-order', placeOrder)


module.exports = router;