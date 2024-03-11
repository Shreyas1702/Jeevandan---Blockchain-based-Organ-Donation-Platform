const { urlencoded } = require("express");
const express = require("express");
// const catchAsync = require("./../utils/catchAsync");
const router = express.Router();
const passport = require("passport");
const app = express();
const haversine = require("haversine-distance");
const User = require("../models/user");
const Donor = require("../models/Donor");
const Reciever = require("../models/Reciever");
const Transplant = require("../models/Transplant");
var t_id = [];

module.exports.register = async (req, res, next) => {
  try {
    var { id, email, username, lngt, ltd, meta_address } = req.body;
    console.log(req.body);
    meta_address = meta_address.toLowerCase();
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

    console.log(address);
    const hosp = await User.find({
      meta_address: address,
    });
    const hosp_user = hosp[0]._id;
    console.log(hosp_user);

    await Donor.create({
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
      address: hosp_user,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports.reciever_reg = async (req, res, next) => {
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
      seriouness,
      link,
      nftId,
      contact,
      age,
      organs,
    } = req.body;

    console.log(address);
    const hosp = await User.find({
      meta_address: address,
    });
    const hosp_user = hosp[0]._id;
    console.log(hosp_user);
    const reciever = new Reciever({
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
      contact,
      seriouness,
      meta_address,
      address: hosp_user,
    });
    reciever.save();
  } catch (e) {
    console.log(e);
  }
};

module.exports.matching = async (req, res, next) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    var list = req.body;
    var d = await Donor.find({ id: id }).populate("address").exec();
    // console.log(d);
    var donor = d[0];
    // console.log(donor);
    var reciever_list = [];
    for (var i = 0; i < list.length; i++) {
      const person = await Reciever.find({ id: list[i] })
        .populate("address")
        .exec();
      // console.log(person[0]);
      reciever_list.push(person[0]);
    }
    var arrObject = reciever_list;
    for (let i = 0; i < reciever_list.length; i++) {
      const a = { latitude: donor.address.ltd, longitude: donor.address.lngt };
      const b = {
        latitude: reciever_list[i].address.ltd,
        longitude: reciever_list[i].address.lngt,
      };
      // console.log(haversine(a, b));
      const distance = haversine(a, b);
      //Attaching returned distance from function to array elements
      arrObject[i].distance = distance / 1000;
    }
    arrObject.sort(function (a, b) {
      return a.distance - b.distance;
    });

    console.log("Before Considering seriousness factor : -");
    for (var i = 0; i < arrObject.length; i++) {
      // console.log(arrObject[i].distance);
      console.log(arrObject[i].name);
      console.log(arrObject[i].seriouness);
    }

    arrObject.sort(function (a, b) {
      return b.seriouness - a.seriouness;
    });

    console.log("Distance is being maintained : -");
    for (var i = 0; i < arrObject.length; i++) {
      // console.log(arrObject[i].distance);
      console.log(arrObject[i].name);
      console.log(arrObject[i].seriouness);
    }

    res.status(200).json({
      data: arrObject,
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports.transplantIn = async (req, res, next) => {
  console.log(req.body);
  const { id, Id, organ } = req.body;
  const donor = await Donor.find({ id: Id });
  console.log("Donater :- ", donor);
  const d_id = donor[0]._id;
  var transplant_id;

  console.log("Donor Id :-", d_id);

  do {
    transplant_id = Math.floor(100000 + Math.random() * 900000);
  } while (!t_id.every((element) => element == transplant_id));

  const ambulance_dd = {
    name: "None",
    contact: 00,
    number_plate: 00,
  };
  const airlift_dd = {
    name: "None",
    contact: 00,
    tail_number: 00,
  };

  const transplant = await new Transplant({
    reciever_id: id,
    organ,
    donor_id: d_id,
    transplant_id,
    ambulance_dd,
    airlift_dd,
  });

  transplant.save();

  res.status(200).json({
    data: transplant_id,
    success: true,
  });
};

module.exports.ambdetail = async (req, res, next) => {
  console.log(req.body);
  const { id } = req.params;

  const filter = { transplant_id: id };

  const update = {
    stage: 2,
    type_transport: "Ambulance",
    trans_start: Date.now(),
    ambulance_dd: {
      name: req.body.name,
      contact: req.body.contact,
      number_plate: req.body.plate_num,
    },
  };

  await Transplant.findOneAndUpdate(filter, update, {
    new: true,
  });

  res.status(200).json({
    success: true,
  });
};

module.exports.airdetail = async (req, res, next) => {
  console.log(req.body);
  const { id } = req.params;

  const filter = { transplant_id: id };

  const update = {
    stage: 2,
    type_transport: "Airlift",
    trans_start: Date.now(),
    airlift_dd: {
      name: req.body.name,
      contact: req.body.contact,
      tail_number: req.body.plate_num,
    },
  };

  await Transplant.findOneAndUpdate(filter, update, {
    new: true,
  });

  res.status(200).json({
    success: true,
  });
};

module.exports.org_rec = async (req, res, next) => {
  const { id } = req.params;

  const filter = { transplant_id: id };

  const update = {
    stage: 3,
    trans_end: Date.now(),
  };

  await Transplant.findOneAndUpdate(filter, update, {
    new: true,
  });

  res.status(200).json({
    success: true,
  });
};

module.exports.trans_sur = async (req, res, next) => {
  const { id } = req.params;

  const filter = { transplant_id: id };

  const update = {
    stage: 4,
    t_s_start: Date.now(),
  };

  await Transplant.findOneAndUpdate(filter, update, {
    new: true,
  });

  res.status(200).json({
    success: true,
  });
};

module.exports.sur_end = async (req, res, next) => {
  const { id } = req.params;

  const filter = { transplant_id: id };

  const update = {
    stage: 5,
    t_s_end: Date.now(),
  };

  await Transplant.findOneAndUpdate(filter, update, {
    new: true,
  });

  res.status(200).json({
    success: true,
  });
};

module.exports.getTransData = async (req, res, next) => {
  console.log(req.body);
  const tId = req.body.data;

  const Data = await Transplant.find({ transplant_id: tId })
    .populate("donor_id")
    .populate("reciever_id")
    .exec();

  const d = Data[0];

  console.log(Data);

  const DonorHosp = await User.findById(d.donor_id.address);
  console.log(DonorHosp);

  const RecHosp = await User.findById(d.reciever_id.address);
  console.log(RecHosp);

  console.log(d);

  res.status(200).json({
    data: {
      d,
      DonorHosp,
      RecHosp,
    },
    sucess: true,
  });
};

module.exports.getEntireData = async (req, res, next) => {
  console.log(req.body);

  const user = await User.find({ meta_address: req.body.account });
  // console.log(user);

  if (user.length != 0) {
    const completed_trans = await Transplant.find({
      hospital_id: user[0]._id,
      success: true,
    })
      .populate("donor_id")
      .populate("reciever_id");
    // console.log("Completed :- ", completed_trans);

    const incompleted_trans = await Transplant.find({
      hospital_id: user[0]._id,
      success: false,
    })
      .populate("donor_id")
      .populate("reciever_id");
    // console.log("InCompleted :- ", incompleted_trans.length);

    const donor = await Donor.find({ address: user[0]._id }).populate(
      "address"
    );
    // console.log(donor);

    const reciever = await Reciever.find({ address: user[0]._id }).populate(
      "address"
    );
    // console.log(reciever);

    const no_donor = donor.length;
    const no_reciever = reciever.length;
    const total_pt = no_donor + no_reciever;
    const complete_trans = completed_trans.length;
    const incomplete_trans = incompleted_trans.length;
    const ongoing_p = incompleted_trans;

    for (var i = 0; i < ongoing_p.length; i++) {
      // console.log(arrObject[i].distance);
      console.log("Ongoing :- ", ongoing_p[i]);
    }

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
  }
};
