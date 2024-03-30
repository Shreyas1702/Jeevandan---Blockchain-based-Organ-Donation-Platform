const express = require("express");
const User = require("../models/user");
const Donor = require("../models/Donor");
const Reciever = require("../models/Reciever");
const Transplant = require("../models/Transplant");
const sendMail = require("./Email");
const axios = require("axios");
const Doctor = require("../models/Doctor");

module.exports.getEntire = async (req, res, next) => {
  try {
    const completed_d_trans = await Transplant.find({
      success: true,
    })
      .populate("donor_id")
      .populate("reciever_id");

    const completed_r_trans = await Transplant.find({
      success: true,
    })
      .populate("donor_id")
      .populate("reciever_id");

    //   console.log(
    //     "Completed :- ",
    //     completed_d_trans.length,
    //     completed_r_trans.length
    //   );

    const incompleted_d_trans = await Transplant.find({
      success: false,
    })
      .populate("donor_id")
      .populate("reciever_id");

    const incompleted_r_trans = await Transplant.find({
      success: false,
    })
      .populate("donor_id")
      .populate("reciever_id");

    //   console.log(
    //     "InCompleted :- ",
    //     incompleted_d_trans.length,
    //     incompleted_r_trans.length
    //   );

    const donor = await Donor.find({}).populate("address");
    //   console.log(donor);

    const reciever = await Reciever.find({}).populate("address");
    //   console.log(reciever);

    const no_donor = donor.length;
    const no_reciever = reciever.length;
    const total_pt = no_donor + no_reciever;
    const complete_trans = completed_d_trans.length;
    const incomplete_trans = incompleted_d_trans.length;
    var ongoing_p = incompleted_d_trans;

    const data = {
      no_donor,
      no_reciever,
      total_pt,
      complete_trans,
      incomplete_trans,
      ongoing_p,
      success: true,
    };

    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

module.exports.getDonor = async (req, res, next) => {
  try {
    const donor = await Donor.find({}).populate("address");
    console.log(donor);

    const data = {
      donor,
      success: true,
    };

    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

module.exports.getReciever = async (req, res, next) => {
  try {
    const donor = await Reciever.find({}).populate("address");
    console.log(donor);

    const data = {
      donor,
      success: true,
    };

    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

module.exports.getTrans = async (req, res, next) => {
  try {
    const donor = await Transplant.find({})
      .populate("donor_id")
      .populate("reciever_id")
      .populate("donor_hosp")
      .populate("reciever_hosp");
    console.log(donor);

    const data = {
      donor,
      success: true,
    };

    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

module.exports.brainData = async (req, res, next) => {
  try {
    console.log(req.body);
    if (req.body) {
      const { id, donor_hosp } = req.body;
      const donor = await Donor.find({ id: id });
      const hosp = await User.find({ meta_address: donor_hosp.toLowerCase() });
      const location = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${hosp[0].ltd}&lon=${hosp[0].lngt}&type=postcode&format=json&apiKey=546c7760cf0940f1bb4e2dc549625656`
      );
      const city = location.data.results[0].city;
      console.log(city);
      const doc1 = await Doctor.find({ city: city, Specialist: "Physician" });
      const doc2 = await Doctor.find({
        city: city,
        Specialist: "Neurologist",
      });
      console.log(docs);
      res.status(200).json({
        donor,
        hosp,
        doc1,
        doc2,
      });
    }
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

module.exports.brainDatas = async (req, res, next) => {
  try {
    console.log(req.body);
    if (req.body) {
      const { id, donor_hosp, doc1, doc2 } = req.body;
      const donor = await Donor.find({ id: id });
      const hosp = await User.find({ meta_address: donor_hosp.toLowerCase() });
      const doc_1 = await Doctor.findOne({ meta_address: doc1.toLowerCase() });
      const doc_2 = await Doctor.findOne({ meta_address: doc2.toLowerCase() });

      console.log(doc_1, doc_2);
      res.status(200).json({
        donor,
        hosp,
        doc_1,
        doc_2,
      });
    }
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

module.exports.getIdDonor = async (req, res, next) => {
  try {
    const { id } = req.body;
    const donor = await Donor.find({ id: id }).populate("address");
    console.log(donor);

    const data = {
      donor,
      success: true,
    };

    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

module.exports.checkDoc = async (req, res, next) => {
  try {
    const { account } = req.body;
    console.log(req.body);
    const donor = await Doctor.find({ meta_address: account });
    console.log(donor);

    if (donor.length == 0) {
      data = {
        success: false,
      };
    } else {
      data = {
        success: true,
      };
    }

    res.status(200).json(data);
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};
