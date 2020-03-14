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

// let labels = [
//   { board_id: results.id, color: "#61be4f" },
//   { board_id: results.id, color: "#61be4f" },
//   { board_id: results.id, color: "#f2d600" },
//   { board_id: results.id, color: "#ff9f1a" },
//   { board_id: results.id, color: "#eb5946" },
//   { board_id: results.id, color: "#c377e0" },
//   { board_id: results.id, color: "#0079bf" },
//   { board_id: results.id, color: "#00c2e0" },
//   { board_id: results.id, color: "#ff77cb" },
//   { board_id: results.id, color: "#344562" }
// ];

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
