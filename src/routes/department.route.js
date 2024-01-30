const express = require("express");
const router = express.Router();

const {addDepartment,fetchyearbyDept,fetchDept} = require("../controllers/department.controller");

router.route("/add").post(addDepartment);
router.route("/fetch").get(fetchyearbyDept);
router.route("/fetchDept").get(fetchDept);

module.exports = router;