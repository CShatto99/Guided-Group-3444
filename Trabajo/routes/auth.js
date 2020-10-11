require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authToken = require("../middleware/authToken");
const genAccessToken = require("../utils/genAccessToken");
const { findUserByID } = require("../mongodb/user");

// @route GET /auth/user
// @desc Get a user
// @access private
router.get("/user", authToken, async (req, res) => {
  const { _id, fullName, email } = await findUserByID(req.user.ID.id);

  res.json({ _id, fullName, email });
});

// @type GET /auth/token
// @desc refresh access token
// @access Private
router.get("/token", authToken, async (req, res) => {
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
