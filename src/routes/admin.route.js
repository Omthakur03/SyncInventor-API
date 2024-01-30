const express = require("express");
const router = express.Router();

const {createAdmin,AdminLogin} = require("../controllers/admin.controller");

router.route("/create").post(createAdmin);
router.route("/login").post(AdminLogin);

module.exports = router;