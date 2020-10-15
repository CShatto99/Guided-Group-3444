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

  if (
    !name ||
    !email ||
    // !company ||
    // !companyID ||
    // !coordinates ||
    !address ||
    !city ||
    !state ||
    !zip
  ) {
    return res.status(400).json({ msg: "Please enter all required fields" });
  }

  let profile = req.body;
  profile.userID = req.user.ID.id;

  try {
    const profileFound = await findProfileByUser(req.user.ID.id);

    // update profile if it already exists
    if (profileFound) {
      console.log(profile);
      const updatedProfile = await updateProfile(profile);

      return res.json(updatedProfile);
    }

    const newProfile = await insertProfile(profile);

    res.json(newProfile);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server error" });
  }
});

module.exports = router;
