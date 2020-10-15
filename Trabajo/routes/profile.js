require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authToken = require("../middleware/authToken");
const { insertProfile } = require("../mongodb/profile");

// @route POST /profile
// @desc Create a new profile
// @access Private
router.post("/", authToken, async (req, res) => {
  const {
    name,
    email,
    company,
    companyID,
    coordinates,
    address,
    city,
    state,
    zip,
    rides,
    rideDays,
    admin,
  } = req.body;

  if (
    !name ||
    !email ||
    !company ||
    !companyID ||
    !coordinates ||
    !address ||
    !city ||
    !state ||
    !zip
  ) {
    return res.status(400).json({ msg: "Please enter all required fields" });
  }

  const profile = {
    name,
    email,
    company,
    companyID,
    coordinates,
    address,
    city,
    state,
    zip,
    rides,
    rideDays,
    admin,
    userID: req.user.ID.id,
  };

  const newProfile = await insertProfile(profile);

  res.json(newProfile);
});

module.exports = router;
