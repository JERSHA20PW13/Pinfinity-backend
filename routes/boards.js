const express = require("express");
const router = express.Router();
const multer = require("multer");

const BoardModel = require("../models/BoardModel");
const PinsModel = require("../models/PinsModel");

router.post("/create-board", multer().none(), (req, res) => {
  const document = new BoardModel({
    userid: req.body.userid,
    boardid: req.body.boardid,
    title: req.body.title,
    pinids: [],
  });
  document.pinids.push(req.body.firstpinid);
  document.save();
  res.send("Board created");
});

router.put("/update-boards/:boardid", multer().none(), (req, res) => {
  BoardModel.findOneAndUpdate(
    { boardid: req.params.boardid },
    {
      $push: { pinids: req.body.newpinid },
    }
  )
    .then((docs) => {
      res.send("Board updated");
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/get-boards/:userid", (req, res) => {
  BoardModel.find({ userid: req.params.userid })
    .then((docs) => {
      const promises = docs.map((board) => {
        const pins = [];
        const promiseArray = [];
        board.pinids.forEach((pinid) => {
          const promise = PinsModel.findOne({ pinid: pinid })
            .then((pin) => {
              pins.push(pin);
            })
            .catch((err) => {
              console.error(err);
            });
          promiseArray.push(promise);
        });
        return Promise.all(promiseArray).then(() => ({
          userid: board.userid,
          boardid: board.boardid,
          title: board.title,
          pinsArray: pins,
        }));
      });
      Promise.all(promises).then((result) => {
        res.send(result);
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

router.delete("/delete-board/:boardid", (req, res) => {
  BoardModel.findOneAndDelete({ boardid: req.params.boardid })
    .then((docs) => {
      res.send("Board deleted");
    })
    .catch((err) => {
      console.error(err);
    });
});

router.put("/update-board/:boardid", multer().none(), (req, res) => {
  BoardModel.findOneAndUpdate(
    { boardid: req.params.boardid },
    {
      title: req.body.title,
    }
  )
    .then((docs) => {
      res.send("Board title updated");
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
