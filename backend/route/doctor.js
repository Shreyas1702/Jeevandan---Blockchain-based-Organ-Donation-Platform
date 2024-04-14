const express = require("express");
const router = express.Router();
const doctor = require("./../controller/doctor");

router.route("/doclog").post(doctor.doclogin);
router.route("/getPatient").post(doctor.patData);
module.exports = router;
