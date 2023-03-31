require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const connection = require("./database");
const user = require("./routes/user");
const pins = require("./routes/pins");

const app = express();
app.use(cors());

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Pinfinity");
});

app.use("/user", user);
app.use("/pins", pins);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
