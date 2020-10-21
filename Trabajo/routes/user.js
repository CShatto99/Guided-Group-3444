require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const genAccessToken = require("../utils/genAccessToken");
const genRefreshToken = require("../utils/genRefreshToken");
const { insertUser, findUserByEmail } = require("../mongodb/user");

/* Function Name: router.post("/login")
 * Parameters: "/login", async (req, res)
 * Return: user object with access token
 * Purpose: This post route allows the user to login with an email and password, checks if the inputs are valid,
 * and generates an access token allowing the user to login to Trabajo
 */
router.post("/login", async (req, res) => {
  // pull body from request
  const { email, password } = req.body;

  // check if any fields are empty
  if (!email || !password)
    return res.status(400).json({ msg: "Please enter an email and password" });

  // check if user email exists
  const lowercaseEmail = email.toLowerCase();
  const user = await findUserByEmail(lowercaseEmail);

  // if user doesn't exist, notify user of invalid credentials
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  // check if password is correct
  const match = await bcrypt.compare(password, user.password);

  // if passwords don't match, notify user as such
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

/* Function Name: router.post("/register")
 * Parameters: "/register", async (req, res)
 * Return: user object with access token
 * Purpose: This post route will allow a user to register with Trabajo by ensuring valid information is entered in and that
 * there is no email reusage.
 */
router.post("/register", async (req, res) => {
  // pull body from request
  const { fullName, email, password, confirmPassword } = req.body;

  // check if any fields are empty
  if (!fullName || !email || !password || !confirmPassword)
    return res
      .status(400)
      .json({ msg: "Please enter all required information." });

  // check if user email already exists by casting email to lowercase
  const lowercaseEmail = email.toLowerCase();
  const userFound = await findUserByEmail(lowercaseEmail);
  // if email already exists, notify user as such
  if (userFound) return res.status(400).json({ msg: "Email already exists." });

  // Check if passwords match
  if (password !== confirmPassword)
    return res.status(400).json({ msg: "Passwords do not match." });

  if (password.length < 6)
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
