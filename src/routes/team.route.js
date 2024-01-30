const express = require("express")

const router = express.Router();


const {createTeam,getTeam,getAllTeam} = require("../controllers/team.controller");

router.route("/create").post(createTeam);
router.route("/").get(getTeam);
router.route("/all").get(getAllTeam);

module.exports = router;