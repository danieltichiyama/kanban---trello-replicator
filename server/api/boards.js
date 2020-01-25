const express = require("express");

const router = express.Router();

router.get("/:id", (req, res) => {
  return req.database.Board.where({ created_by: req.params.id })
    .fetchAll()
    .then(results => {
      console.log(results);
      return res.json(results);
    })
    .catch(err => {
      console.log(err);
      return res.json({ err });
    });
});

router.get("/smoke", (req, res) => {
  return res.send("There's smoke in the boards router.");
});

module.exports = router;
