const express = require("express");
const app = express();

app.use(express.json());

app.use("/user", require("./routes/user"));

app.use("/auth", require("./routes/auth"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
