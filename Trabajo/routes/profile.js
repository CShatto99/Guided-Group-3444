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
const { findCompanyByName } = require("../mongodb/company");
const profile = require("../mongodb/profile");
const NodeGeocoder = require("node-geocoder");

/* Function Name: router.post("/company")
 * Parameters: "/company", authToken, async (req, res)
 * Return: updated profile
 * Purpose: This post route will update a user's company name and code if the input fields are filled in
 *          and the the company name already exists in the database.
 */
router.post("/company", authToken, async (req, res) => {
  const { company, companyCode } = req.body;

  // Try/catch block to ensure any errors when updating a user's company name and code are caught

  try {
    // if the input fields for name and code are empty, user will be notified as such
    if (!company || !companyCode)
      return res.status(400).json({ msg: "Please enter all required fields." });

    // findCompany will await the return of the findCompanyByName function, which will attempt to find the company with
    // the user's inputted company name
    const findCompany = await findCompanyByName(company);

    const match = await bcrypt.compare(companyCode, findCompany.hashedCode);

    if (!match) return res.status(400).json({ msg: "Invalid company code." });

    // if the company name doesn't exist, the user will be notified as such
    if (!findCompany)
      return res.status(400).json({ msg: "Company does not exist." });

    // else, findProfile will find the user's profile with their ID and will have their profile updated using both findProfile
    // and their previous profile information with prevProfile into a new const updatedProfile

    const findProfile = await findProfileByUser(req.user.ID.id);

    const updatedProfile = {
      ...findProfile,
      ...{ company, companyID: findCompany._id, admin: null },
    };

    // updateProfile will then update the user profile with updatedProfile and return a json with an object containing updatedProfile

    await updateProfile(updatedProfile);

    res.json({ profile: updatedProfile });
  } catch (error) {
    // if there's an error, this route will return a 500 status describing an interal server error
    return res.status(500).json({ msg: "Internal Server error" });
  }
});

/* Function Name: router.get("/")
 * Parameters: "/", authToken, async (req, res)
 * Return: object containing a found profile
 * Purpose: This get route will attempt to find the user's profile using findProfileByUser function
 */
router.get("/", authToken, async (req, res) => {
  // Try/catch block to ensure any errors are caught when trying to find the user's profile
  try {
    // profileFound will await the return value of the findProfileByUser function using the request's user's ID
    // will return an object containing profileFound if found
    const profileFound = await findProfileByUser(req.user.ID.id);
    return res.json({ profile: profileFound });
  } catch (error) {
    // if there's an error, this route will return a 500 status describing an internal server error
    return res.status(500).json({ msg: "Internal Server error" });
  }
});

/* Function Name: router.post("/")
 * Parameters: "/", authToken, async (req, res)
 * Return: returns either a newly created profile or an updated profile should it exist
 * Purpose: This post route will either create a new profile or update an existing profile depending on whether or not
 * the user already exists with their inputted email address
 */
router.post("/", authToken, async (req, res) => {
  // object containing the user information from the request body
  const { name, email, address, state, city, zip, rideDays } = req.body;

  // if any of the input fields are empty, the user will be notified as such
  if (!name || !email || !address || !state || !city || !zip || !rideDays)
    return res.status(400).json({ msg: "Please enter all required fields" });

  // Try/catch block to ensure any errors when updating/creating a profile are caught
  try {
    // If the email already exists, deny update
    const profileExists = await findUserByEmail(email);
    if (profileExists && req.user.ID.id !== profileExists._id.toString())
      return res.status(400).json({ msg: "That email is taken" });

    // If the profile already exists, update it
    const profileFound = await findProfileByUser(req.user.ID.id);
    if (profileFound) {
      // newProfile contains the object from the profileFound and request body
      const newProfile = { ...profileFound, ...req.body };

      //check to see if lat/long needs to be updated
      if (
        profileFound.address != newProfile.address ||
        profileFound.city != newProfile.city ||
        profileFound.state != newProfile.state ||
        profileFound.zip != newProfile.zip
      ) {
        const options = {
          provider: "google",

          // Optional depending on the providers
          //fetch: customFetchImplementation,
          apiKey: process.env.GOOGLE_MAPS_API_SECRET, // for Mapquest, OpenCage, Google Premier
          formatter: null, // 'gpx', 'string', ...
        };

        const geocoder = NodeGeocoder(options);

        const gres = await geocoder.geocode(
          address + " " + city + " " + state + " " + zip
        );

        newProfile.lat = gres[0].latitude;
        newProfile.long = gres[0].longitude;
      }

      // updatedProfile function is called with newProfile
      await updateProfile(newProfile);

      // response is returned with an object containing newProfile
      return res.json({ profile: newProfile });
    }

    // If the profile does not exist, create it and insert it
    const profile = { ...req.body, ...{ userID: req.user.ID.id } };

    //get lat/long
    const options = {
      provider: "google",

      // Optional depending on the providers
      //fetch: customFetchImplementation,
      apiKey: process.env.GOOGLE_MAPS_API_SECRET, // for Mapquest, OpenCage, Google Premier
      formatter: null, // 'gpx', 'string', ...
    };
    const geocoder = NodeGeocoder(options);
    const gres = await geocoder.geocode(
      address + " " + city + " " + state + " " + zip
    );

    profile.lat = gres[0].latitude;
    profile.long = gres[0].longitude;
    const newProfile = await insertProfile(profile);

    // response is returned with an object containing newProfile
    res.json({ profile: newProfile });
  } catch (error) {
    // if there's an error, this route will return a 500 status describing an internal server error
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;
