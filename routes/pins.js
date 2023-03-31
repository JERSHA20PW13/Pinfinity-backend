const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const multer = require("multer");

const upload = require("../utils/pins-upload");
const PinsModel = require("../models/PinsModel");
const db = require("../database");

const gfsBucket = new mongodb.GridFSBucket(db, {
  bucketName: "pins",
});

router.post("/create-pin", upload.single("pin"), (req, res) => {
  const document = new PinsModel({
    userid: req.body.userid,
    pinid: req.body.pinid,
    title: req.body.title,
    description: req.body.description,
    pinUri:
      "https://pinfinity.onrender.com/pins/get-pin/" +
      req.body.userid +
      "-pins-" +
      req.body.pinid +
      "/" +
      Date.now(),
    pin: req.pin,
  });
  document.save();
  res.send("Pin created");
});

router.get("/get-pins/:userid", (req, res) => {
  PinsModel.find({ userid: req.params.userid })
    .then((docs) => {
      res.send(docs.reverse());
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/get-pin/:filename/*", (req, res) => {
  try {
    const readstream = gfsBucket.openDownloadStreamByName(req.params.filename);
    readstream.pipe(res);
  } catch (error) {
    console.log(error);
    res.send("Error");
  }
});

router.get("/get-all-pins", (req, res) => {
  PinsModel.find()
    .then((docs) => {
      res.send(docs.reverse());
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
