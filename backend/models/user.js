const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  ltd: {
    type: Number,
    required: true,
  },
  lngt: {
    type: Number,
    required: true,
  },
  meta_address: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
