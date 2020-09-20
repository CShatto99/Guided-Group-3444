const express = require("express");
const app = express();

app.use(express.json());

app.use("/", require("./routes/test"));
app.use("/user", require("./routes/user"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
