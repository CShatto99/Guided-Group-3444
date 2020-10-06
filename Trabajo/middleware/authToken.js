const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  const token = req.headers["x-auth-token"];
  try {
    if (!token) return res.status(401).json({ msg: "Token does not exist" });

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = payload;

    next();
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = authToken;
