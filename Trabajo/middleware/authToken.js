const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  const token = req.headers["x-auth-token"];
  try {
    if (!token)
      return res.status(401).json({
        msg: "Logged out due to inactivity, refresh the page and try again",
      });

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = payload;

    next();
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({
        msg: "Logged out due to inactivity, refresh the page and try again",
      });
  }
};

module.exports = authToken;
