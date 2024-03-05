const express = require("express");
const router = express.Router();
const users = require("./../controller/user");
const passport = require("passport");
router.route("/register").post(users.register);

router.route("/donor_reg/:id").post(users.donor_reg);

router.route("/reciever_reg/:id").post(users.reciever_reg);

router.route("/MatchingPage").get(users.matching);

module.exports = router;
