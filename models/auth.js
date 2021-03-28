const mongoose = require("mongoose");
const Joi = require("joi");
const authSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

function validateUser(user) {
  const schema = {
    username: Joi.string().min(5).email(),
    password: Joi.string().min(5),
  };
  return Joi.validate(user, schema);
}

module.exports = mongoose.model("auth", authSchema);
