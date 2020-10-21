const jwt = require("jsonwebtoken");

const genAccessToken = ID =>
  jwt.sign({ ID }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });

module.exports = genAccessToken;
