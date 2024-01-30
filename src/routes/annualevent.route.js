const express = require("express")

const router = express.Router();


const {getFilterSubevnets,createAnnualEvent,getAnnualEvent,getUserAnnualEvent,getUserSubEvent} = require("../controllers/annualevent.controller");

router.route("/create").post(createAnnualEvent);
router.route("/").get(getAnnualEvent);
router.route("/filter/:id").get(getFilterSubevnets);
router.route("/user").get(getUserAnnualEvent);
router.route("/user_sub").get(getUserSubEvent);

module.exports = router;