const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/auth.middleware")

const {createBranch, getAllBranch,getBranch, getBranchDetails} = require("../controllers/branchs.contoller")


// branch
router.route("/create").post(createBranch).get(getAllBranch)
router.route("/").get(getBranch)
router.route("/details").get(getBranchDetails)


module.exports = router