const { urlencoded } = require("express");
const express = require("express");
// const catchAsync = require("./../utils/catchAsync");
const router = express.Router();
const passport = require("passport");
const app = express();

const User = require("../models/user");
const Donor = require("../models/Donor");

module.exports.register = async (req, res, next) => {
  try {
    const { id, email, username, lngt, ltd, meta_address } = req.body;
    console.log(req.body);
    const user = new User({ id, email, username, lngt, ltd, meta_address });
    user.save();
  } catch (e) {
    // req.flash("error", `${e.message}`);
    res.redirect("register");
  }
};

module.exports.donor_reg = async (req, res, next) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const {
      name,
      weight,
      height,
      hla,
      bloodgroup,
      meta_address,
      address,
      link,
      nftId,
      kincontact,
      age,
      organs,
    } = req.body;
    const donor = new Donor({
      id,
      name,
      weight,
      height,
      hla,
      link,
      bloodgroup,
      organs,
      age,
      nftId,
      kincontact,
      meta_address,
      address,
    });
    donor.save();
  } catch (e) {
    console.log(e);
  }
};
