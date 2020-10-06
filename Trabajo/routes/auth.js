require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authToken = require("../middleware/authToken");
const genAccessToken = require("../utils/genAccessToken");

// @type GET /auth/token
// @desc refresh access token
// @access Private
router.get("/token", authToken, async (req, res) => {
  console.log(req.user.ID.id);

  // generate access token
  const accessToken = genAccessToken({ id: req.user.ID.id });

  res.send({ accessToken });
});

// @type POST /auth/token
// @desc logout user
// @access Private
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(204).send();
});

module.exports = router;
