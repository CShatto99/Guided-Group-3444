require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const genAccessToken = require("../utils/genAccessToken");
const genRefreshToken = require("../utils/genRefreshToken");
const { insertUser, findUserByEmail } = require("../mongodb/user");

router.post("/login", async (req, res) => {
  // pull body from request
  const { email, password } = req.body;

  // check if any fields are empty
  if (!email || !password)
    return res.status(400).json({ msg: "Please enter an email and password" });

  // check if user email exists
  const lowercaseEmail = email.toLowerCase();
  const findEmail = await findUserByEmail(lowercaseEmail);

  if (findEmail.length === 0)
    return res.status(400).json({ msg: "Invalid credentials" });

  // check if password is correct
  const match = await bcrypt.compare(password, findEmail[0].password);

  if (!match) return res.status(400).json({ msg: "Invalid credentials" });

  // generate access tokens
  const accessToken = genAccessToken({ id: findEmail[0]._id });
  const refreshToken = genRefreshToken({ id: findEmail[0]._id });

  // store refresh token in httpOnly cookie
  res.cookie("token", refreshToken, {
    expires: new Date(Date.now() + 604800),
    httpOnly: true,
  });

  // respond with access token
  res.json({ accessToken });
});

router.post("/register", async (req, res) => {
  // pull body from request
  const { fullName, email, password, confirmPassword } = req.body;

  // check if any fields are empty
  if (!fullName || !email || !password || !confirmPassword)
    return res
      .status(400)
      .json({ msg: "Please enter all required information." });

  // check if user email already exists
  const lowercaseEmail = email.toLowerCase();
  const findEmail = await findUserByEmail(lowercaseEmail);
  if (findEmail.length > 0)
    return res.status(400).json({ msg: "Email already exists." });

  // Check if passwords match
  if (password !== confirmPassword)
    return res.status(400).json({ msg: "Passwords do not match." });

  // hash user password
  const salt = await bcrypt.genSalt();
  const hashedPass = await bcrypt.hash(password, salt);

  // create and store new user
  const newUser = { fullName, email, password: hashedPass };
  const userInserted = await insertUser(newUser);

  // generate access tokens
  const accessToken = genAccessToken({ id: userInserted._id });
  const refreshToken = genRefreshToken({ id: userInserted._id });

  // store refresh token in httpOnly cookie
  res.cookie("token", refreshToken, {
    expires: new Date(Date.now() + 604800),
    httpOnly: true,
  });

  // respond with access token
  res.json({ accessToken });
});

module.exports = router;
