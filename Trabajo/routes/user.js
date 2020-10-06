require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const genAccessToken = require("../utils/genAccessToken");
const genRefreshToken = require("../utils/genRefreshToken");
const { insertUser, findUserByEmail } = require("../mongodb/user");

router.post("/login", async (req, res) => {
  const { _id, name } = req.body;

  const user = await insertID({ _id, name });

  res.json({ user });
});

router.post("/register", async (req, res) => {
  // pull body from request
  const { fullName, email, password, confirmPassword } = req.body;

  // check if any fields are empty
  if (!fullName || !email || !password || !confirmPassword)
    return res
      .status(400)
      .json({ msg: "Please enter all required information." });

  // convert email to lowercase
  const lowercaseEmail = email.toLowerCase();

  // check if user email already exists
  const findEmail = await findUserByEmail(lowercaseEmail);

  console.log(findEmail);
  if (findEmail) return res.status(400).json({ msg: "Email already exists." });

  // Check if passwords match
  if (password !== confirmPassword)
    return res.status(400).json({ msg: "Passwords do not match." });

  // generate unique ID for user
  const ID = uuidv4();

  // hash user password
  const salt = await bcrypt.genSalt();
  const hashedPass = await bcrypt.hash(password, salt);

  // create and store new user
  const newUser = { ID, fullName, email, hashedPass };
  await insertUser(newUser);

  // generate access tokens
  const accessToken = genAccessToken({ ID });
  const refreshToken = genRefreshToken({ ID });

  // store refresh token in httpOnly cookie
  res.cookie("token", refreshToken, {
    expires: new Date(Date.now() + 604800),
    httpOnly: true,
  });

  // respond with access token
  res.json({ accessToken });
});

module.exports = router;
