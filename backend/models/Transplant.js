const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransplantSchema = new Schema({
  donor_id: {
    type: Schema.Types.ObjectId,
    ref: "Donor",
  },
  donor_hosp: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reciever_hosp: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  organ: {
    type: String,
    required: true,
  },
  stage: {
    type: Number,
    default: 1,
  },
  t_vehicle: {
    type: Number,
    default: -1,
  },
  reciever_id: {
    type: Schema.Types.ObjectId,
    ref: "Reciever",
  },
  transplant_id: {
    type: "Number",
    required: true,
  },
  organ_match: {
    type: Date,
    default: Date.now(),
  },
  trans_start: {
    type: Date,
    default: Date.now(),
  },
  trans_end: {
    type: Date,
    default: Date.now(),
  },
  t_s_start: {
    type: Date,
    default: Date.now(),
  },
  t_s_end: {
    type: Date,
    default: Date.now(),
  },
  success: {
    type: Boolean,
    default: false,
  },
  type_transport: {
    type: String,
    enum: ["Ambulance", "Airlift", "None"],
    default: "None",
  },
  ambulance_dd: {
    name: {
      type: String,
    },
    contact: {
      type: Number,
    },
    number_plate: {
      type: String,
    },
  },
  airlift_dd: {
    name: {
      type: String,
    },
    contact: {
      type: Number,
    },
    tail_number: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Transplant", TransplantSchema);
