const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/auth.middleware")

const {createBranch,getBranch,addProduct,getAllProduct,getProduct,updateProduct} = require("../controllers/branchs.contoller")

router.route("/create").post(createBranch)
router.route("/getBranch").get(getBranch)
router.route("/add").post(authMiddleware,addProduct)
router.route("/getAll").get(authMiddleware,getAllProduct)

router.route("/get").get(authMiddleware,getProduct)
router.route("/update").patch(authMiddleware,updateProduct)


module.exports = router