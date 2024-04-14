const express = require("express");
const router = express.Router();
const driver = require("./../controller/driver");

router.route("/driverlog").post(driver.driverlogin);

module.exports = router;
