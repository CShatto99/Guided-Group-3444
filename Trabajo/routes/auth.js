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

  res.json({ user: { _id, fullName, email } });
});

// @type GET /auth/token
// @desc refresh access token
// @access Private
router.get("/token", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.json({ accessToken: "" });

    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const accessToken = genAccessToken({ id: payload.ID.id });

    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ msg: "Error validating token" });
  }
});

// @type POST /auth/token
// @desc logout user
// @access Private
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(204).send();
});

module.exports = router;
