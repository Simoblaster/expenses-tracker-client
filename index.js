const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.static("./client/build"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "client/build/index.html"))
);

