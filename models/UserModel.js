const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userid: String,
  firstname: String,
  surname: String,
  username: String,
  about: String,
  profile: Buffer,
  profileUri: String,
});

const UserModel = mongoose.model("UserModel", userSchema);

module.exports = UserModel;
