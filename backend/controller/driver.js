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
      const id = user[0].id;
      const name = user[0].name;
      const city = user[0].city;
      const gender = user[0].gender;
      const contact_number = user[0].contact_number;

      res.status(200).json({
        id,
        name,
        city,
        gender,
        contact_number,
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

module.exports.getDriver = async (req, res, next) => {
  const { id } = req.body;

  const filter = {
    "ambulance_dd.contact": id,
  };

  const data = await Transplant.find(filter);

  console.log(data);

  res.status(200).json({
    data,
  });
};
