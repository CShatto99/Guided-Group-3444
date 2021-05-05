const jwt = require("jsonwebtoken");

const genAccessToken = ID =>
  jwt.sign({ ID }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });

module.exports = genAccessToken;
