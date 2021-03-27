const authModel = require("../models/auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  const authData = new authModel(req.body);
  authData.save((err, savedData) => {
    if (err) {
      res.status(400).send({
        message: err.message,
      });
    } else {
      var token = jwt.sign(savedData, process.env.TOKEN);
      res.status(201).send({ token: token });
    }
  });
};

exports.login = async (req, res) => {
  let userData = req.body;
  authModel.findOne({ email: userData.email }, (error, user) => {
    if (error) {
      console.log(error);
    } else {
      if (!user) {
        res.status(401).send({ message: "Invalid Email" });
      } else if (user.password !== userData.password) {
        res.status(401).send({ message: "Invalid password" });
      } else {
        let token = jwt.sign({ user: user }, process.env.TOKEN);
        res.status(200).send({ token: token, user: user });
      }
    }
  });
};
