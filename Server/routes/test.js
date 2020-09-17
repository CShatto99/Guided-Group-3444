const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ msg: "Username is required" });
  if (!password) return res.status(400).json({ msg: "Password is required" });
  res.json({ email, password });
});

module.exports = router;
