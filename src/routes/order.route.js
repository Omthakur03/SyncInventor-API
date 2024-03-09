const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/auth.middleware")

const {CreateOrder, getAllOrder, getBranchOrder, updateOrder, getOrder} = require("../controllers/order.controller")

router.route("/create").post(CreateOrder)
router.route("/").get(getAllOrder)
router.route("/branch").get(getBranchOrder)
router.route("/update").patch(updateOrder)
router.route("/order").get(getOrder)

module.exports = router