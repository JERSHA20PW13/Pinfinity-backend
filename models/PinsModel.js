const mongoose = require("mongoose");

const pinsSchema = new mongoose.Schema({
  userid: String,
  pinid: String,
  title: String,
  description: String,
  pin: Buffer,
  pinUri: String,
});

const PinsModel = mongoose.model("PinsModel", pinsSchema);

module.exports = PinsModel;
