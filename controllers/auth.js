const authModel = require("../models/auth");

exports.register = async (req, res) => {
  const authData = new authModel(req.body);
  authData.save((err, savedData) => {
    if (err) {
      res.status(400).send({
        message: err.message,
      });
    } else {
      res.status(201).send(savedData);
    }
  });
};
