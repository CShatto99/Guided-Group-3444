require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authToken = require("../middleware/authToken");
const {
  insertCompany,
  findAllCompanies,
  findCompanyByName,
} = require("../mongodb/company");
const { findProfileBycompanyCode } = require("../mongodb/profile");
const NodeGeocoder = require("node-geocoder");

router.post("/coordinates", authToken, async (req, res) => {
  const { companyCode } = req.body;
  try {
    const profiles = await findProfileBycompanyCode(companyCode);

    res.json(profiles);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server error" });
  }
});

/* Function Name: router.get("/all")
 * Parameters: "/all", authToken, async (req, res)
 * Return: json containing all the companies registered with Trabajo
 * Purpose: This get route will assign an array of company objects and return a json containing that array
 */
router.get("/all", authToken, async (req, res) => {
  // Try/catch block to ensure any errors are caught when trying to assign the return value of findAllCompanies to companies
  try {
    const companies = await findAllCompanies();
    // json is returned containing the companies variable
    return res.json(companies);
  } catch (error) {
    // if there's an error, there will be a 500 status describing an interal server error
    return res.status(500).json({ msg: "Internal Server error" });
  }
});

/* Function Name: router.post("/create")
 * Parameters: "/create", authToken, async (req, res)
 * Return: json with a newly inserted company
 * Purpose: This post route will verify company information when creating a new company to register with Trabajo.
 */
router.post("/create", authToken, async (req, res) => {
  // pull body from request
  const {
    name,
    address,
    city,
    state,
    zip,
    code,
    confirmCode,
    image,
  } = req.body;

  // check if any fields are empty
  if (!name || !address || !city || !state || !zip || !code || !confirmCode)
    return res.status(400).json({ msg: "Please enter all required fields" });

  console.log("made it here");
  // check if company already exists by casting the company name to lowercase
  const lowercaseName = name.toLowerCase();
  const companyFound = await findCompanyByName(lowercaseName);

  // if the company is found, the creator will be notified as such
  if (companyFound)
    return res.status(400).json({ msg: "Company already exists." });

  // Check if passwords match
  if (code !== confirmCode)
    return res.status(400).json({ msg: "Codes do not match." });

  try {
    // hash company password
    const salt = await bcrypt.genSalt();
    const hashedCode = await bcrypt.hash(code, salt);

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


    // create and store new user
    const newCompany = {
      name: lowercaseName,
      address,
      city,
      state,
      zip,
      lat: gres[0].latitude,
      long: gres[0].longitude,
      hashedCode,
      image,
    };

    // company will contain the return value of insertCompany with the newCompany object
    const company = await insertCompany(newCompany);

    // returns a response json containing company
    return res.json(company);
  } catch (error) {
    console.log(error);
    // if there's an error, there will be a 500 status describing an interal server error
    return res.status(500).json({ msg: "Internal Server error" });
  }
});

module.exports = router;
