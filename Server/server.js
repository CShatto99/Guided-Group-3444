const express = require("express");

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use("/", require("./routes/test"));
