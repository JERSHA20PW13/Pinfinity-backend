const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];
    console.log(req.body);
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${req.body.userid}-pins-${req.body.pinid}`;
      return filename;
    }
    return {
      bucketName: "pins",
      filename: `${req.body.userid}-pins-${req.body.pinid}`,
    };
  },
});

module.exports = multer({ storage });
