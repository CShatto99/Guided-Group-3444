const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

//The following define settings to use for the server
app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({limit: "16mb"}));
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//web sockets
const WebSocket = require("ws");

const wss = new WebSocket.Server({port: 8080});

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    wss.clients.forEach(function each(client) {
      if(client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    })
    console.log(`received: ${message}`);
  });

  ws.send("Connected to the chat!");

});

//the following are higher level endpoints, eg. http://localhost.com:5000/<higherlevel>/<lowerlevel>
//the higher level routes are defined in the /routes folder
app.use("/user", require("./routes/user"));
app.use("/auth", require("./routes/auth"));
app.use("/profile", require("./routes/profile"));
app.use("/company", require("./routes/company"))

//the port to use
const port = process.env.PORT || 5000;

//run the server
app.listen(port, () => console.log(`Listening on port ${port}`));
