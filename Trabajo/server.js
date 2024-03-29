const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const jwt = require("jsonwebtoken");
const { saveMessageToDB } = require("./mongodb/company");

//The following define settings to use for the server
app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "16mb" }));
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//web sockets
const WebSocket = require("ws");

//this sets up the web socket connection and make sure it is an authenticated user requesting
const wss = new WebSocket.Server({
  path: "/ws",
  //port to use for websockets
  port: 8080,
  //authentication method
  verifyClient: (info, cb) => {
    let authTok = [];
    if (info.req.headers.cookie != undefined) {
      authTok = info.req.headers.cookie.split("=");
    }

    if (authTok == []) {
      cb(false, 401, "unauthorized");
    }

    if (!authTok[1]) {
      cb(
        false,
        401,
        "Logged out due to inactivity, refresh the page and try again"
      );
    } else {
      jwt.verify(
        authTok[1],
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err) {
            cb(false, 401, "unauthorized");
          } else {
            info.req.user = decoded;
            cb(true);
          }
        }
      );
    }
  },
});

//this handles what happens when the web socket connects after authentication
//and what happens with received messages
wss.on("connection", conn => {
  conn.on("message", function incoming(message) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        saveMessageToDB(message);
        client.send(message);
      }
    });
  });

  conn.send("Connected to the chat!");
});

//the following are higher level endpoints, eg. http://localhost.com:5000/<higherlevel>/<lowerlevel>
//the higher level routes are defined in the /routes folder
app.use("/user", require("./routes/user"));
app.use("/auth", require("./routes/auth"));
app.use("/profile", require("./routes/profile"));
app.use("/company", require("./routes/company"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//the port to use
const port = process.env.PORT || 5000;

//run the server
app.listen(port, () => console.log(`Listening on port ${port}`));
