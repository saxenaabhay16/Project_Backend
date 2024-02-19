const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
});

const BlacklistedToken = mongoose.model("BlacklistedToken", tokenSchema);

module.exports = BlacklistedToken;
