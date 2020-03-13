const express = require("express");

const router = express.Router();

router.get("/smoke", (req, res) => {
  return res.send("There's smoke in the boards router.");
});

router.delete("/:id", (req, res) => {
  return req.database.Board.where({ id: req.params.id })
    .destroy()
    .then(results => {
      return res.status(200).send({ wasSuccessful: true });
    });
});

router.put("/:id", (req, res) => {
  return req.database.Board.where({ id: req.params.id })
    .save(req.body, { method: "update", patch: true })
    .then(results => {
      return results.load(["boardImage"]);
    })
    .then(results => {
      return res.json(results);
    })
    .catch(err => {
      console.log(err);
    });
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
    .fetchAll({ withRelated: ["boardImage"] })
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
        "cards.labels",
        "boardImage",
        "cards.cardImages",
        "cards.createdBy",
        "cards.assignedTo",
        "cards.list",
        "labels",
        "lists"
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
