const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const verifyToken = require("./middlewares/authmiddleware");
const userRouters = require("./routes/user");
const cors = require("cors");

const db =
  "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
mongoose.connect(db, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to Mongoose.....");
  }
});
const authRouters = require("./routes/auth");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    // res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use("/auth", authRouters);
app.use("/user", verifyToken, userRouters);

module.exports = app;
