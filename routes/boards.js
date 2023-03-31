const express = require("express");
const router = express.Router();

const BoardModel = require("../models/BoardModel");

router.post("/create-board", (req, res) => {
  const document = new BoardModel({
    userid: req.body.userid,
    boardid: req.body.boardid,
    title: req.body.title,
    pinids: [req.body.firstpinid],
  });
  document.save();
  res.send("Board created");
});

module.exports = router;
