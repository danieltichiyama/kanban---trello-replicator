const express = require("express");

router = express.Router();

router.get("/smoke", (req, res) => {
  return res.send("There's smoke in the lists route.");
});

router.post("/new", (req, res) => {
  //req.body = {name, position, board_id}
  return req.database.List.forge(req.body)
    .save()
    .then(result => {
      console.log("successfully added.");
      res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/:listID", (req, res) => {
  return req.database.List.where({ id: req.params.listID })
    .fetch()
    .then(result => {
      return res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
