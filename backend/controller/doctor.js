const User = require("../models/user");
const Donor = require("../models/Donor");
const Reciever = require("../models/Reciever");
const Transplant = require("../models/Transplant");
const sendMail = require("./Email");
const axios = require("axios");
const Doctor = require("../models/Doctor");

module.exports.doclogin = async (req, res, next) => {
  try {
    var { account } = req.body;

    const doctor = await Doctor.find({ meta_address: account });
    const d = doctor[0];
    console.log(d);
    res.status(200).json({
      data: d,
      success: true,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

module.exports.patData = async (req, res, next) => {
  try {
    console.log(req.body);
    const { donor_id, donor_hosp } = req.body;

    const donor = await Donor.find({ id: donor_id });

    const d_hosp = await User.find({ meta_address: donor_hosp.toLowerCase() });
    const dono_hosp = d_hosp[0];

    console.log(donor, d_hosp);

    const location = await axios.get(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${dono_hosp.ltd}&lon=${dono_hosp.lngt}&type=postcode&format=json&apiKey=546c7760cf0940f1bb4e2dc549625656`
    );

    const city = location.data.results[0].city;

    res.status(200).json({
      donor: donor,
      donor_hosp: d_hosp,
      city,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};
