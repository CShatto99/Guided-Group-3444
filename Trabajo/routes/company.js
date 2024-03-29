require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const authToken = require("../middleware/authToken");
const {
  insertCompany,
  findAllCompanies,
  findCompanyByName,
  updateCompanyCode
} = require("../mongodb/company");
const {
  findProfileByEmail,
  updateProfile,
  findProfileBycompanyID,
} = require("../mongodb/profile");
const NodeGeocoder = require("node-geocoder");

router.post("/", authToken, async (req, res) => {
  const { company } = req.body;

  try {
    const companyFound = await findCompanyByName(company);

    res.json(companyFound);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server error" });
  }
});

router.post("/coordinates", authToken, async (req, res) => {
  const { companyID } = req.body;

  try {
    const profiles = await findProfileBycompanyID(companyID);

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
    email,
  } = req.body;

  // check if any fields are empty
  if (!name || !address || !city || !state || !zip || !code || !confirmCode)
    return res.status(400).json({ msg: "Please enter all required fields" });

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

    //pull user profile and update their company and admin
    const profile = await findProfileByEmail(email);
    profile.company = company.name;
    profile.companyID = company._id.toString();
    profile.admin = company._id.toString();

    await updateProfile(profile);

    // returns a response json containing company
    return res.json(company);
  } catch (error) {
    // if there's an error, there will be a 500 status describing an interal server error
    return res.status(500).json({ msg: "Internal Server error" });
  }
});

router.post("/updateCode", authToken, async (req, res) => {
  const {
    email,
    company,
    oldCode,
    newCode,
    newCodeConfirm
  } = req.body;

  // check if valid user
  if (!email || !company)
    return res.status(404).json({ msg: "You are not an authorized user." });
  
  // check if any fields are empty
  if (!oldCode || !newCode || !newCodeConfirm)
    return res.status(400).json({ msg: "Please enter all required fields" });

 // Check if passwords match
 if (newCode !== newCodeConfirm)
   return res.status(400).json({ msg: "Codes do not match." });

  // check if company exists by casting the company name to lowercase
  const lowercaseName = company.toLowerCase();
  const companyFound = await findCompanyByName(lowercaseName);

  // if the company is not found, the creator will be notified as such
  if (!companyFound)
    return res.status(400).json({ msg: "You are not authorized to perform this action." });

    console.log(companyFound);

  const match = await bcrypt.compare(oldCode, companyFound.hashedCode);
  if (!match) return res.status(400).json({ msg: "Invalid company code." });

  // hash company password
  const salt = await bcrypt.genSalt();
  const hashedCode = await bcrypt.hash(newCode, salt);

  companyFound.hashedCode = hashedCode;

  updateCompanyCode(companyFound);

  return res.status(200).json({msg: "Success!"});
});

module.exports = router;
