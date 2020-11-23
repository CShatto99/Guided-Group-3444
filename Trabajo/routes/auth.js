require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authToken = require("../middleware/authToken");
const genAccessToken = require("../utils/genAccessToken");
const { findUserByID } = require("../mongodb/user");

/* Function: router.get("/user")
 * Parameters: "/user", authToken, async (req, res)
 * Return: json containing an object with a key user and value object with the user's id, full name, and email
 * Purpose: This get route will find the user by their ID using the findUserByID function and returns a response containing
 * the users ID, full name and email
 */
router.get("/user", authToken, async (req, res) => {
  // object will contain the user ID, full name, and email once the findUserByID function returns properly
  const { _id, fullName, email } = await findUserByID(req.user.ID.id);

  // response will return a json containing a user object with the above object as its value
  res.json({ user: { _id, fullName, email } });
});

/* Function: router.get("/token")
 * Parameters: "/token", async (req, res)
 * Return: json with an object containing accessToken
 * Pur
 * This get route will generate an access token for the user should the original access token expire or the
 * page is refreshed.
 */
router.get("/token", async (req, res) => {
  // Try/catch block to ensure any errors are caught when attempting to refresh the access token
  try {
    // token will be the request's cookie's original token
    const token = req.cookies.token;

    // if there's no token, the route will return a response indicating as such
    if (!token) return res.json({ accessToken: "" });

    // payload will be refreshed with a newly generated ID to eventually generate a new access token
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    // accessToken is then regenerated using the payload ID
    const accessToken = genAccessToken({ id: payload.ID.id });

    // returns reponse containing an object with accessToken
    res.json({ accessToken });
  } catch (error) {
    // if there's an error, there will be a 500 status describing an issue with validating the token
    res.status(401).json({ msg: "Error validating token" });
  }
});

/* Function: router.post("/logout")
 * Parameters: "/logout", (req, res)
 * Return: response which clears the cookie token and a 204 status
 * Purpose: This post route will allow the user to sucessfully logout of Trabajo.
 * */
router.post("/logout", (req, res) => {
  console.log("logging out...");
  // response is sent that clears the cookie token and sends a 204 status indicating the user has successfully logged out.
  res.clearCookie("token");
  res.status(204).send();
});

module.exports = router;
