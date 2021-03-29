const authModel = require("../models/auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const authData = new authModel(req.body);
  try {
    authData.password = await bcrypt.hash(
      authData.password,
      await bcrypt.genSalt(10)
    );
    authData.save((err, user) => {
      if (err) {
        res.status(400).send({
          message: err.message,
        });
      } else {
        var token = jwt.sign({ user: user }, process.env.TOKEN);
        res.status(201).send({ user: user, token: token });
      }
    });
  } catch (ex) {
    res.status(401).send({ message: ex.message });
  }
};

exports.login = async (req, res) => {
  let userData = req.body;
  authModel.findOne({ email: userData.email }, async (error, user) => {
    if (error) {
      console.log(error);
    } else {
      const valid_pass = await bcrypt.compare(userData.password, user.password);
      if (!user) {
        res.status(401).send({ message: "Invalid Email" });
      } else if (valid_pass) {
        res.status(401).send({ message: "Invalid password" });
      } else {
        let token = jwt.sign({ user: user }, process.env.TOKEN);
        res.status(200).send({ token: token, user: user });
      }
    }
  });
};
