const express = require("express");
const User = require("../models/user");
const Donor = require("../models/Donor");
const Reciever = require("../models/Reciever");
const Transplant = require("../models/Transplant");
const sendMail = require("./Email");
const axios = require("axios");
const Doctor = require("../models/Doctor");

module.exports.getDonor_id = async (req, res, next) => {
  try {
    const { donor_id, recie_id, account } = req.body;

    const don = await Donor.find({ id: donor_id });
    const rec = await Reciever.find({ id: recie_id });
    const hos = await User.find({ meta_address: account.toLowerCase() });

    res.status(200).json({
      donor_id: don[0],
      reciever_id: rec[0],
      hosp: hos[0],
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
      success: false,
    });
  }
};
