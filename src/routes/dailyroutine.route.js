const express = require("express");
const router = express.Router();

const {createRoutine,getAllRoutine,getRoutine,updateRoutine,deleteroutine} = require("../controllers/dailyroutine.controller");

router.route("/create").post(createRoutine);
router.route("/fetch").get(getRoutine);
router.route("/").get(getAllRoutine);
router.route("/update").patch(updateRoutine);
router.route("/delete").delete(deleteroutine)

module.exports = router;