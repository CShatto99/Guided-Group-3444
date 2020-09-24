require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { insertNewID } = require("../mongodb/dbRunScript");

router.post("/login", async (req, res) => {
  const { _id, name } = req.body;

  insertNewID({ _id, name });

  res.json({ _id, name });
});

module.exports = router;
