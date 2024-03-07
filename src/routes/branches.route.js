const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/auth.middleware")

const {createBranch, getAllBranch,getBranch,addProduct,getAllProduct,getProduct,updateProduct} = require("../controllers/branchs.contoller")


// branch
router.route("/").post(createBranch).get(getAllBranch)
router.route("/:id").get(getBranch)

// product
router.route("/product/add").post(authMiddleware,addProduct)
router.route("/product/getAll").get(authMiddleware,getAllProduct)
router.route("/product/get").get(authMiddleware,getProduct)

router.route("/product/update").patch(authMiddleware,updateProduct)


module.exports = router