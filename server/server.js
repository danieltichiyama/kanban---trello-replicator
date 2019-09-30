const express = require("express");
const bodyParser = require("body-parser");
const decorator = require("./database/decorator");

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(decorator);

app.get("/", (req, res) => {
  res.send("smoke test");
});

app.listen(PORT, () => {
  console.log(`PORT: ${PORT}, at your service.`);
});
