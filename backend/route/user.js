const express = require("express");
const router = express.Router();
const users = require("./../controller/user");
const passport = require("passport");
router.route("/register").post(users.register);

router.route("/donor_reg").post(users.donor_reg);

module.exports = router;
