const express = require("express");

router = express.Router();

router.get("/smoke", (req, res) => {
  return res.send("There's smoke in the lists route.");
});

router.delete("/:id", (req, res) => {
  return req.database.List.where({ id: req.params.id })
    .destroy()
    .then(results => {
      return res.status(200).send({ wasSuccessful: true });
    });
});

router.put("/:id", (req, res) => {
  return req.database.List.where({ id: req.params.id })
    .save(req.body, { method: "update", patch: true })
    .then(results => {
      return results.load([
        "cards.labels",
        "cards.createdBy",
        "cards.assignedTo",
        "cards.cardImages"
      ]);
    })
    .then(results => {
      return res.json(results);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/new", (req, res) => {
  //req.body = {name, position, board_id}
  return req.database.List.forge(req.body)
    .save()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/:listID", (req, res) => {
  return req.database.List.where({ id: req.params.listID })
    .fetch()
    .then(results => {
      return results.load([
        "cards.labels",
        "cards.createdBy",
        "cards.assignedTo",
        "cards.cardImages"
      ]);
    })
    .then(results => {
      return res.json(results);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
