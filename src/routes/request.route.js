const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/auth.middleware")

const { createRequest, getAllRequest, getRequest, getBranchRequest, updateRequest } = require("../controllers/request.controller")

router.route("/create").post(createRequest)
router.route("/getAll").get(getAllRequest)
router.route("/get").get(getRequest)
router.route("/branch").get(getBranchRequest)
router.route("/update").patch(updateRequest)

module.exports = router