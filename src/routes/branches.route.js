const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/auth.middleware")

const {createBranch, getAllBranch,getBranch} = require("../controllers/branchs.contoller")


// branch
router.route("/create").post(createBranch).get(getAllBranch)
router.route("/:id").get(getBranch)


module.exports = router