const express = require("express");
const bodyParser = require("body-parser");
const decorator = require("./database/decorator");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(decorator);

app.get("/", (req, res) => {
  res.send("smoke test");
});

app.get("/cards", (req, res) => {
  return req.database.Card.fetchAll().then(results => {
    res.send(results.toJSON());
  });
});

app.listen(PORT, () => {
  console.log(`PORT: ${PORT}, at your service.`);
});
