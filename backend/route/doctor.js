const express = require("express");
const router = express.Router();
const users = require("./../controller/user");
const doctor = require("./../controller/doctor");
const passport = require("passport");

router.route("/doclog").post(doctor.doclogin);
router.route("/getPatient").post(doctor.patData);
module.exports = router;
