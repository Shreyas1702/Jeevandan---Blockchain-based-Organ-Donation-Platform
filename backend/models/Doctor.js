const mongoose = require("mongoose");

// Define doctor schema
const doctorSchema = new mongoose.Schema({
  meta_address: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Define doctor model
const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
