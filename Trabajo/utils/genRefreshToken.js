const jwt = require("jsonwebtoken");

const genAccessToken = ID =>
  jwt.sign({ ID }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

module.exports = genAccessToken;
