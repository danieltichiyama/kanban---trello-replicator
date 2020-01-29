const express = require("express");

const router = express.Router();

router.get("/smoke", (req, res) => {
  return res.send("There's smoke in the boards router.");
});

router.post("/new", (req, res) => {
  //req.body = {name, [description], created_by}
  return req.database.Board.forge(req.body)
    .save()
    .then(results => {
      //returns a copy of the saved data, if no description, {description:null}
      return res.json(results);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/all/:id", (req, res) => {
  return req.database.Board.where({ created_by: req.params.id })
    .fetchAll()
    .then(results => {
      return res.json(results);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/:boardID", (req, res) => {
  return req.database.Board.where({ id: req.params.boardID })
    .fetch({
      withRelated: [
        "createdBy",
        "lists.cards.labels",
        "boardImage",
        "lists.cards.cardImages",
        "lists.cards.createdBy",
        "lists.cards.assignedTo",
        "labels"
      ]
    })
    .then(results => {
      return res.json(results);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
