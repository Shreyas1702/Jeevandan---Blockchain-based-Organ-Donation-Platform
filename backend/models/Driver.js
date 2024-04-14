const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  contact_number: {
    type: String,
    required: true,
  },
  number_plate: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    enum: ["Mumbai", "Vasai-Virar"],
    required: true,
  },
});

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
