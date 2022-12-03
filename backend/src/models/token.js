const mongoose = require("mongoose");
const connection = require("../config/database");

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
});

const Token = connection.model("Token", tokenSchema);

module.exports = Token;