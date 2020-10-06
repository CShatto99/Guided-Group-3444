require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/profile", async (req, res) => {
  const {
    fullName,
    email,
    phone,
    company,
    companyCode,
    address,
    city,
    state,
    password,
    confirmPassword,
    companyImage,
  } = req.body;

  if (
    !fullName ||
    !email ||
    !phone ||
    !company ||
    !companyCode ||
    !address ||
    !city ||
    !state ||
    !password ||
    !confirmPassword ||
    !companyImage
  ) {
    return res.status(400).json({ msg: "Please enter all required fields." });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Passwords do not match." });
  }

  // All form data exists and passwords match

  res.send("hey");
});

module.exports = router;
