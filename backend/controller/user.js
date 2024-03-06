const { urlencoded } = require("express");
const express = require("express");
// const catchAsync = require("./../utils/catchAsync");
const router = express.Router();
const passport = require("passport");
const app = express();
const haversine = require('haversine-distance')
const User = require("../models/user");
const Donor = require("../models/Donor");
const Reciever = require("../models/Reciever");

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
    // console.log(req.body);
    // const { id } = req.params;
    var list = [426962, 719566, 714778, 311124, 915996]
    ;
    var id = 20324;

    var d = await Donor.find({ id: id }).populate("address").exec();

    // console.log(d);

    var donor = d[0];

    console.log(donor);

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
      console.log(donor.address.ltd + "    " + donor.address.lngt + "   " + reciever_list[i].address.ltd + "   " + reciever_list[i].address.lngt)

      const a = {latitude : donor.address.ltd , longitude : donor.address.lngt}
      const b = { latitude: reciever_list[i].address.ltd, longitude: reciever_list[i].address.lngt }
      console.log(haversine(a, b)) 

      const distance = haversine(a, b);
      //Attaching returned distance from function to array elements
      arrObject[i].distance = distance/1000;
    }

    arrObject.sort(function (a, b) {
      return a.distance - b.distance;
    });

    console.log("Distance is being maintained : -");

    for (var i = 0; i < arrObject.length; i++) {
      console.log(arrObject[i].distance);
      console.log(arrObject[i].name);
    }

    // console.log(reciever_list);
  } catch (e) {
    console.log(e);
  }
};

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d; // distance returned
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
