const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecieverSchema = new Schema({
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
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  nftId: {
    type: Number,
    default: -1,
  },
  contact: {
    type: Number,
    required: true,
  },
  seriouness: {
    type: Number,
    required: true,
  },
  meta_address: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Reciever", RecieverSchema);
