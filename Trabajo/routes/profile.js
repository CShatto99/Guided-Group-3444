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
const { findUserByEmail } = require("../mongodb/user");
const profile = require("../mongodb/profile");

// @route GET /profile
// @desc Get a user profile
// @access Private

router.get("/", authToken, async (req, res) => {
  try {
    const profileFound = await findProfileByUser(req.user.ID.id);
    return res.json({ profile: profileFound });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server error" });
  }
});

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
  /*
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
  }*/

  let profile = req.body;
  profile.userID = req.user.ID.id;

  try {
    const profileFound = await findProfileByUser(req.user.ID.id);

    // update profile if it already exists
    if (profileFound) {
      profileFound.name = profile.name;
      profileFound.email = profile.email;
      profileFound.company = profile.company;
      profileFound.companyID = profile.companyID;
      profileFound.coordinates = profile.coordinates;
      profileFound.address = profile.address;
      profileFound.city = profile.city;
      profileFound.state = profile.state;
      profileFound.zip = profile.zip;

      const updatedProfile = await updateProfile(profileFound);

      return res.json(updatedProfile);
    }

    const newProfile = await insertProfile(profile);

    res.json(newProfile);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server error" });
  }
});

// @route POST /profile/updateProfile
// @desc Create/update a user profile
// @access Private
router.post("/updateProfile", authToken, async (req, res) => {
  const { name, email, address, state, city, zip, rideDays } = req.body;

  if (!name || !email || !address || !state || !city || !zip || !rideDays)
    return res.status(400).json({ msg: "Please enter all required fields" });

  try {
    // If the email already exists, deny update
    const profileExists = await findUserByEmail(email);
    if (profileExists && req.user.ID.id !== profileExists._id.toString())
      return res.status(400).json({ msg: "That email is taken" });

    // If the profile already exists, update it
    const profileFound = await findProfileByUser(req.user.ID.id);
    if (profileFound) {
      const newProfile = { ...profileFound, ...req.body };

      await updateProfile(newProfile);

      return res.json({ profile: newProfile });
    }

    // If the profile does not exist, create it
    const profile = { ...req.body, ...{ userID: req.user.ID.id } };
    const newProfile = await insertProfile(profile);

    res.json({ profile: newProfile });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;

// need a route for adding a company page
// need a route for adding riders page
