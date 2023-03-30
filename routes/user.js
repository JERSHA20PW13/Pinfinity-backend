const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");

const UserModel = require("../models/UserModel");
const upload = require("../utils/upload");
const db = require("../database");

const gfsBucket = new mongodb.GridFSBucket(db, {
  bucketName: "profile",
});

router.post("/add-user", upload.single("profile"), (req, res) => {
  const document = new UserModel({
    userid: req.body.userid,
    firstname: req.body.firstname,
    surname: req.body.surname,
    username: req.body.username,
    about: req.body.about,
    profileImage: req.profile,
  });
  document.save();
  res.send("User added");
});

router.get("/get-profile/:filename", async (req, res) => {
  try {
    const readstream = gfsBucket.openDownloadStreamByName(req.params.filename);
    readstream.pipe(res);
  } catch (error) {
    console.log(error);
    res.send("Error");
  }
});

module.exports = router;
