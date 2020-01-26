const express = require("express");
const app = express();
const port = 5000;
const path = require("path");

app.use(express.static("public"));

app.get("/game", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
