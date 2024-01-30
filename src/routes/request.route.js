const express =  require("express");
const router = express.Router();

const {createRequest,updateRequest,getRequestAdmin,allRequest} = require("../controllers/request.controller");

router.route("/create").post(createRequest);
router.route("/admin").get(getRequestAdmin);
router.route("/update").patch(updateRequest);
router.route("/all").get(allRequest);

module.exports = router;