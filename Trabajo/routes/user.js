require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const genAccessToken = require("../utils/genAccessToken");
const genRefreshToken = require("../utils/genRefreshToken");
const { insertUser, findUserByEmail } = require("../mongodb/user");

// @route POST /user/login
// @desc Login a user
// @access Public
router.post("/login", async (req, res) => {
  // pull body from request
  const { email, password } = req.body;

  // check if any fields are empty
  if (!email || !password)
    return res.status(400).json({ msg: "Please enter an email and password" });

  // check if user email exists
  const lowercaseEmail = email.toLowerCase();
  const user = await findUserByEmail(lowercaseEmail);

  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  // check if password is correct
  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(400).json({ msg: "Invalid credentials" });

  // generate access tokens
  const accessToken = genAccessToken({ id: user._id });
  const refreshToken = genRefreshToken({ id: user._id });

  // store refresh token in httpOnly cookie
  res.cookie("token", refreshToken, {
    expires: new Date(Date.now() + 604800),
    httpOnly: true,
  });

  // respond with new user and access token
  res.json({
    user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
    accessToken,
  });
});

// @route POST /user/register
// @desc Register a user
// @access Public
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
  const userFound = await findUserByEmail(lowercaseEmail);
  if (userFound) return res.status(400).json({ msg: "Email already exists." });

  // Check if passwords match
  if (password !== confirmPassword)
    return res.status(400).json({ msg: "Passwords do not match." });

  // hash user password
  const salt = await bcrypt.genSalt();
  const hashedPass = await bcrypt.hash(password, salt);

  // create and store new user
  const newUser = { fullName, email, password: hashedPass };
  const user = await insertUser(newUser);

  // generate access tokens
  const accessToken = genAccessToken({ id: user._id });
  const refreshToken = genRefreshToken({ id: user._id });

  // store refresh token in httpOnly cookie
  res.cookie("token", refreshToken, {
    expires: new Date(Date.now() + 604800),
    httpOnly: true,
  });

  // respond with new user and access token
  res.json({
    user: { _id: user._id, fullName: user.fullName, email: user.email },
    accessToken,
  });
});

module.exports = router;