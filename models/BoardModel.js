const mongoose = require("mongoose");

const boardsSchema = new mongoose.Schema({
  userid: String,
  boardid: String,
  title: String,
  pinids: Array,
});

const BoardsModel = mongoose.model("BoardsModel", boardsSchema);

module.exports = BoardsModel;
