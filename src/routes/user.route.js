const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware")

const {createUser,getAllUsers, userLogin,forgotPassword,userProfile,ProiflePic} = require("../controllers/user.controller");

router.route("/login").post(userLogin);
router.route("/createUser").post(createUser);
router.route("/update").patch(authMiddleware,forgotPassword);
router.route("/profilepic").patch(authMiddleware,ProiflePic);
router.route("/").get(getAllUsers);
router.route("/profile").get(userProfile);

module.exports = router;