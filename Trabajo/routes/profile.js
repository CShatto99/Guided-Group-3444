require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authToken = require("../middleware/authToken");
const {
  insertProfile,
  findProfileByUser,
  updateProfile,
} = require("../mongodb/profile");

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

  let profile = req.body;
  profile.userID = req.user.ID.id;

  const profileFound = await findProfileByUser(req.user.ID.id);

  // update profile if it already exists
  if (profileFound) {
    const updatedProfile = await updateProfile(profile);

    return res.json(updatedProfile);
  }

  const newProfile = await insertProfile(profile);

  res.json(newProfile);
});

module.exports = router;
