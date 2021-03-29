const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  mobile: Number,
  email: String,
  address: String,
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
