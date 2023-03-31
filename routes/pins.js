const express = require("express");
const router = express.Router();

const upload = require("../utils/pins-upload");
const PinsModel = require("../models/PinsModel");

router.post("/create-pin", upload.single("pin"), (req, res) => {
  const document = new PinsModel({
    userid: req.body.userid,
    title: req.body.title,
    description: req.body.description,
    pinUri:
      "http://pinfinity.onrender.com/user/get-profile/" +
      req.body.userid +
      "/pins/" +
      Date.now(),
    pin: req.pin,
  });
  document.save();
  res.send("Pin created");
});

router.get("/get-pins/:userid", (req, res) => {
  PinsModel.find({ userid: req.params.userid })
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
