const express = require("express");
const bodyParser = require("body-parser");
const decorator = require("./database/decorator");
const app = express();
const PORT = process.env.EXPRESS_HOST_PORT || 8080;

const cards = require("./api/cards");
const boards = require("./api/boards");
const users = require("./api/users");
const labels = require("./api/labels");
const lists = require("./api/lists");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(decorator);

app.use("/api/users", users);
app.use("/api/cards", cards);
app.use("/api/boards", boards);
app.use("/api/labels", labels);
app.use("/api/lists", lists);

app.get("/smoke", (req, res) => {
  return res.send("There's smoke in the server.");
});

app.listen(PORT, () => {
  console.log(`PORT: ${PORT}, at your service.`);
});
