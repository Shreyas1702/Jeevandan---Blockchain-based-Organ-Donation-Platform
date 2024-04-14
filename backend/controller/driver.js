const User = require("../models/user");
const Donor = require("../models/Donor");
const Reciever = require("../models/Reciever");
const Transplant = require("../models/Transplant");
const Driver = require("../models/Driver");

module.exports.driverlogin = async (req, res, next) => {
  const { id, password } = req.body;
  const user = await Driver.find({ id: id });
  console.log(user.length);
  if (user.length != 0) {
    if (user[0].password == password) {
      res.status(200).json({
        data: user[0],
        success: true,
      });
    } else {
      res.status(200).json({
        data: "Password Incorrect",
        success: false,
      });
    }
  } else {
    res.status(404).json({
      data: "Please check your Id",
      success: false,
    });
  }
};
