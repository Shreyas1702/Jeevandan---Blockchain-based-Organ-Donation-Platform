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
const sendMail = require("./Email");

var t_id = [];

module.exports.register = async (req, res, next) => {
  try {
    var { id, email, username, lngt, ltd, meta_address } = req.body;
    console.log(req.body);
    meta_address = meta_address.toLowerCase();
    const user = new User({ id, email, username, lngt, ltd, meta_address });
    user.save();
    res.status(200).json({ success: true });
  } catch (e) {
    // req.flash("error", `${e.message}`);
    res.status(400).json({
      success: false,
      error: e,
    });
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
      email,
    } = req.body;

    var dynamicData = {
      id: id,
      address: meta_address,
    };

    console.log(address);
    var mailOptions = {
      from: "crce.9380.aids@gmail.com",
      to: email,
      subject: "Sending Email using Node.js",
      template: `index`,
      context: dynamicData,
    };

    await sendMail(mailOptions);
    // const hosp = await User.find({
    //   meta_address: address,
    // });
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
      email,
      link,
      bloodgroup,
      organs,
      age,
      nftId,
      kincontact,
      meta_address,
      address: hosp_user,
    });

    res.status(200).json({
      success: true,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
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
      email,
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

    var dynamicData = {
      id: id,
      address: meta_address,
    };
    var mailOptions = {
      from: "crce.9380.aids@gmail.com",
      to: "crce.9380.aids@gmail.com",
      subject: "Sending Email using Node.js",
      template: `reciever`,
      context: dynamicData,
    };

    await sendMail(mailOptions);
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
      email,
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
    res.status(200).json({
      success: true,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
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
      console.log(donor);
      console.log(reciever_list[i]);
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
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

module.exports.transplantIn = async (req, res, next) => {
  try {
    console.log(req.body);
    const { id, Id, organ, d_hosp } = req.body;
    const donor = await Donor.find({ id: Id });
    console.log(id);
    const r = await Reciever.findById(id);
    console.log("Donater :- ", r);
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

    const dd_hosp = await User.find({ meta_address: d_hosp.toLowerCase() });
    const donor_hosp = dd_hosp[0].address;
    const reciever_hosp = r.address;

    const transplant = await new Transplant({
      reciever_id: id,
      organ,
      donor_hosp,
      reciever_hosp,
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
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

module.exports.ambdetail = async (req, res, next) => {
  try {
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
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

module.exports.airdetail = async (req, res, next) => {
  try {
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
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

module.exports.org_rec = async (req, res, next) => {
  try {
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
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

module.exports.trans_sur = async (req, res, next) => {
  try {
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
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

module.exports.sur_end = async (req, res, next) => {
  try {
    const { id } = req.params;

    const filter = { transplant_id: id };

    const update = {
      stage: 5,
      success: true,
      t_s_end: Date.now(),
    };

    await Transplant.findOneAndUpdate(filter, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

module.exports.getTransData = async (req, res, next) => {
  try {
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
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

module.exports.getEntireData = async (req, res, next) => {
  try {
    console.log(req.body);

    const user = await User.find({ meta_address: req.body.account });
    // console.log(user);

    if (user.length != 0) {
      const completed_d_trans = await Transplant.find({
        donor_hosp: user[0]._id,
        success: true,
      })
        .populate("donor_id")
        .populate("reciever_id");

      const completed_r_trans = await Transplant.find({
        reciever_hosp: user[0]._id,
        success: true,
      })
        .populate("donor_id")
        .populate("reciever_id");

      console.log(
        "Completed :- ",
        completed_d_trans.length,
        completed_r_trans.length
      );

      const incompleted_d_trans = await Transplant.find({
        donor_hosp: user[0]._id,
        success: false,
      })
        .populate("donor_id")
        .populate("reciever_id");

      const incompleted_r_trans = await Transplant.find({
        reciever_hosp: user[0]._id,
        success: false,
      })
        .populate("donor_id")
        .populate("reciever_id");

      console.log(
        "InCompleted :- ",
        incompleted_d_trans.length,
        incompleted_r_trans.length
      );

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
      const complete_trans =
        completed_d_trans.length + completed_r_trans.length;
      const incomplete_trans =
        incompleted_d_trans.length + incompleted_r_trans.length;
      var ongoing_p = incompleted_d_trans;

      for (var i = 0; i < incompleted_r_trans.length; i++) {
        // console.log(arrObject[i].distance);
        ongoing_p.push(incompleted_r_trans[i]);
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
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

module.exports.approveNFT = async (req, res, next) => {
  try {
    const { id } = req.params;
    const donor = await Donor.find({ id: id }).populate("address");

    const hosp_address = donor[0].address.meta_address;

    var list = [];

    for (var i = 0; i < donor[0].organs.length; i++) {
      const name = donor[0].organs[i];
      list.push(donor[0].nftId[name]);
    }
    res.render("index.ejs", { id: req.params.id, hosp_address, list });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

module.exports.getDonor = async (req, res, next) => {
  try {
    console.log(req.body);
    const id = req.body.id;

    const donor = await Donor.find({ id: id });

    const data = donor[0];

    console.log(data);

    res.status(200).json({
      data: data,
      success: true,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};
