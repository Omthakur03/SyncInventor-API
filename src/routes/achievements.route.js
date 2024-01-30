const express =  require("express");
const router = express.Router();

const {createAchievement,updateAchievement,getAllAchievementAdmin,getAllAchievements,getUserAchievements} = require("../controllers/achievements.controller");

router.route("/create").post(createAchievement);
router.route("/all").get(getAllAchievements);
router.route("/admin").get(getAllAchievementAdmin);
router.route("/update").patch(updateAchievement);
router.route("/users").get(getUserAchievements);


module.exports = router;