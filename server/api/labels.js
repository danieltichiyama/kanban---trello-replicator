const express = require("express");

const router = express.Router();

router.get("/smoke", (req, res) => {
  return res.send("There's smoke in the labels router.");
});

router.delete("/:id", (req, res) => {
  return req.database.Label.where({ id: req.params.id })
    .destroy()
    .then(results => {
      return res.status(200).send({ wasSuccessful: true });
    });
});

router.put("/:id", (req, res) => {
  return req.database.Label.where({ id: req.params.id })
    .save(req.body, { method: "update", patch: true })
    .then(results => {
      return res.json(results);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/new", (req, res) => {
  //req.body = {[name], [color], board_id}
  return req.database.Label.forge(req.body)
    .save()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/:labelID", (req, res) => {
  return req.database.Label.where({ id: req.params.labelID })
    .fetch()
    .then(result => {
      return res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
