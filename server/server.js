const express = require("express");
const bodyParser = require("body-parser");
const decorator = require("./database/decorator");
const app = express();
const PORT = process.env.EXPRESS_HOST_PORT || 8080;

const cards = require("./api/cards");
const boards = require("./api/boards");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(decorator);

app.use("/api/cards", cards);
app.use("/api/boards", boards);

app.get("/smoke", (req, res) => {
  return req.database.User.fetchAll({
    withRelated: [
      "userImage",
      // "boards.createdBy",
      "boards.lists.cards.labels",
      "boards.boardImage",
      "boards.lists.cards.cardImages"
    ]
  })
    .then(results => {
      return res.json(results);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json(err);
    });
});

app.listen(PORT, () => {
  console.log(`PORT: ${PORT}, at your service.`);
});
