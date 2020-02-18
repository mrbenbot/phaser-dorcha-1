const express = require("express");
const app = express();
const port = 5000;
const path = require("path");

app.use(express.static("public"));

app.get("/game", (req, res) => {
  const { mobile } = req.query;
  if (mobile === "true") {
    res.send("MOB VERSION");
    return;
  }
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
