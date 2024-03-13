const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/auth.middleware")

const {addProduct,getAllProduct,getProduct, deleteProduct, updateProduct} = require("../controllers/product.controller")


// product
router.route("/add").post(addProduct)
router.route("/getAll").get(getAllProduct)
router.route("/get").get(getProduct)
router.route("/delete").delete(deleteProduct)
router.route("/update").patch(updateProduct)


module.exports = router