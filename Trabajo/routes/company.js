require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authToken = require("../middleware/authToken");
const {
    insertCompany,
  findAllCompanies,
  findCompanyByName
} = require("../mongodb/company");

// @route GET /company/all
// @desc Gets all company names and images
// @access Private

router.get("/all", authToken, async (req, res) => {
  try {
    const companies = await findAllCompanies();
    return res.json(companies);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server error" });
  }
});

// @route POST /company/create
// @desc create a company
// @access Public
router.post("/create", authToken, async (req, res) => {
    // pull body from request
  const { name, address, city, state, zip, code, confirmCode, image } = req.body;

  // check if any fields are empty
  if (!name || !address || !city || !state || !zip || !code || !confirmCode )
    return res.status(400).json({ msg: "Please enter all required fields" });

  // check if company already exists
  const companyFound = await findCompanyByName(name);
  if (companyFound) return res.status(400).json({ msg: "Company already exists." });

  // Check if passwords match
  if (code !== confirmCode)
    return res.status(400).json({ msg: "Codes do not match." });

    try {

    // hash company password
    const salt = await bcrypt.genSalt();
    const hashedCode = await bcrypt.hash(code, salt);

    // create and store new user
    const newCompany = { name, address, city, state, zip, hashedCode, image };
    const company = await insertCompany(newCompany);

    return res.json(company);
    } catch (error) {
      return res.status(500).json({ msg: "Internal Server error" });
    }
});

module.exports = router;
