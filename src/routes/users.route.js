const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/auth.middleware")

const {CreateUser,userLogin,forgotPassword, getAllUser} = require("../controllers/users.controller")

router.route("/SignUp").post(CreateUser)
router.route("/login").post(userLogin);
router.route("/update").patch(authMiddleware,forgotPassword);
router.route("/").get(getAllUser)

module.exports = router