const express = require("express");
const router = express.Router();
const users = require("./../controller/user");
const admin = require("./../controller/admin");
const passport = require("passport");

router.route("/getEntire").post(admin.getEntire);
router.route("/getDonor").post(admin.getDonor);
router.route("/getReciever").post(admin.getReciever);
router.route("/getTrans").post(admin.getTrans);
router.route("/getEntiredData").post(admin.brainData);
router.route("/getEntiredDatas").post(admin.brainDatas);
router.route("/getIdDonor").post(admin.getIdDonor);
router.route("/checkDoc").post(admin.checkDoc);

module.exports = router;
