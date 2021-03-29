const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

exports.add = async (req, res) => {
  const userData = new userModel(req.body);
  try {
    userData.save((err, user) => {
      if (err) {
        res.status(400).send({
          message: err.message,
        });
      } else {
        res.status(201).send({ user: user });
      }
    });
  } catch (ex) {
    res.status(401).send({ message: ex.message });
  }
};

exports.list = async (req, res) => {
  let userData = req.body;
  userModel.find({}, async (error, user) => {
    if (error) {
      console.log(error);
    } else {
      if (!user) {
        res.status(401).send({ message: "Invalid Email" });
      } else {
        res.status(200).send({ user: user });
      }
    }
  });
};
