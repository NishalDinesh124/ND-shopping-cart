
const {login, addProducts, getProducts,register, getOrders,getAllUsers, deleteUser} = require('../Controllers/adminController')
const router = require('express').Router();

router.post("/login", login);
// router.post("/register", register);
router.post("/add-products", addProducts)
router.get("/get-products", getProducts)
router.get("/get-orders",getOrders)
router.get("/get-users",getAllUsers)
router.post("/delete-user", deleteUser)


module.exports = router;