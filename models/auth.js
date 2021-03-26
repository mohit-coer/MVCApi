const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("auth", authSchema);
