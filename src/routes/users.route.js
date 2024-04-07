const express = require("express")
const router = express.Router()
const authMiddleware = require("../middlewares/auth.middleware")

const {CreateUser,userLogin,forgotPassword, getAllUser, UserProfile} = require("../controllers/users.controller")

router.route("/SignUp").post(CreateUser)
router.route("/login").post(userLogin);
router.route("/update").patch(authMiddleware,forgotPassword);
router.route("/").get(getAllUser)
router.route("/profile").get(UserProfile)

module.exports = router