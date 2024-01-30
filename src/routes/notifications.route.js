const express = require("express");
const router = express.Router();

const {createNotification,getNotification, getAllNotification , createAllNotification} = require("../controllers/notifications.controller");

router.route("/create").post(createNotification);
router.route("/").get(getNotification);
router.route("/all").get(getAllNotification);
router.route("/createAll").post(createAllNotification);

module.exports = router;