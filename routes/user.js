const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");

const UserModel = require("../models/UserModel");
const upload = require("../utils/upload");
const db = require("../database");
const multer = require("multer");
const send = multer();

const gfsBucket = new mongodb.GridFSBucket(db, {
  bucketName: "profile",
});

router.post("/add-user", send.none(), (req, res) => {
  const document = new UserModel({
    userid: req.body.userid,
    firstname: req.body.firstname,
    surname: req.body.surname,
    username: req.body.username,
    about: req.body.about,
    profileUri:
      "https://www.nicepng.com/png/full/136-1366211_group-of-10-guys-login-user-icon-png.png",
  });
  document.save();
  res.send("User added");
});

router.put("/update-user/:userid", upload.single("profile"), (req, res) => {
  UserModel.findOneAndUpdate(
    { userid: req.params.userid },
    {
      firstname: req.body.firstname,
      surname: req.body.surname,
      username: req.body.username,
      about: req.body.about,
      profile: req.profile,
      profileUri:
        "http://pinfinity.onrender.com/user/get-profile/" +
        req.params.userid +
        "/" +
        Date.now(),
    }
  )
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/get-user/:userid", (req, res) => {
  UserModel.findOne({ userid: req.params.userid })
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/get-profile/:filename/*", async (req, res) => {
  try {
    const readstream = gfsBucket.openDownloadStreamByName(req.params.filename);
    readstream.pipe(res);
  } catch (error) {
    console.log(error);
    res.send("Error");
  }
});

module.exports = router;
