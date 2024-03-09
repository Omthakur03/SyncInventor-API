const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/auth.middleware")

const {CreateCart, getAllCart, getBranchCart, addProduct, getCartProduct} = require("../controllers/cart.controller")

router.route("/create").post(CreateCart)
router.route("/").get(getAllCart)
router.route("/branch").get(getBranchCart)
router.route("/add").patch(addProduct)
router.route("/product").get(getCartProduct)

module.exports = router