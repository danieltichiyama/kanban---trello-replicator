const express = require("express");

const router = express.Router();

router.get("/board/:id", (req, res) => {
  return req.database.Board.where({ id: req.params.id })
    .fetch({
      withRelated: [
        "createdBy",
        "lists.cards.labels",
        "boardImage",
        "lists.cards.cardImages",
        "lists.cards.createdBy",
        "lists.cards.assignedTo"
      ]
    })
    .then(results => {
      return res.json(results);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/:id", (req, res) => {
  return req.database.Board.where({ created_by: req.params.id })
    .fetchAll()
    .then(results => {
      return res.json(results);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/smoke", (req, res) => {
  return res.send("There's smoke in the boards router.");
});

module.exports = router;
