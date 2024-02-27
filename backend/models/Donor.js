const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DonorSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  hla: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  bloodgroup: {
    type: String,
    required: true,
  },
  organs: [
    {
      type: String,
      required: true,
    },
  ],
  age: {
    type: Number,
    required: true,
  },
  nftId: {
    kidney: {
      type: Number,
      default: -1,
    },
    pancreas: {
      type: Number,
      default: -1,
    },
    liver: {
      type: Number,
      default: -1,
    },
  },
  kincontact: {
    type: Number,
    required: true,
  },
  meta_address: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Donor", DonorSchema);
