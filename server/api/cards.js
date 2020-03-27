const express = require("express");

const router = express.Router();
require("passport");

function isAuthenticated(req, res, next) {
  console.log(req.isAuthenticated);
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log("UNAUTH");
    return res.send({ message: "You have not been authenticated" });
  }
}

router.get("/smoke", (req, res) => {
  return res.send("There's smoke in the cards route.");
});

router.delete("/:id", (req, res) => {
  return req.database.Card.where({ id: req.params.id })
    .destroy()
    .then(results => {
      return res.status(200).send({ wasSuccessful: true });
    });
});

router.put("/labels/:id", (req, res) => {
  let labels = req.body.label_ids;
  return req.database.Card.where({ id: req.params.id })
    .fetch({ withRelated: ["labels"] })
    .then(results => {
      return results.labels().detach();
    })
    .then(results => {
      return results.attach(labels);
    })
    .then(results => {
      return req.database.Card.where({ id: req.params.id })
        .fetch({
          withRelated: ["labels", "createdBy", "assignedTo", "cardImages"]
        })
        .then(results => {
          return res.json(results);
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
});

router.put("/:id", (req, res) => {
  return req.database.Card.where({ id: req.params.id })
    .save(req.body, { method: "update", patch: true })
    .then(results => {
      return results.load(["labels", "createdBy", "assignedTo", "cardImages"]);
    })
    .then(results => {
      return res.json(results);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/new", isAuthenticated, (req, res) => {
  //req.body = {title, [details], [due_date], position, created_by, [assigned_to], list_id, [is_archived]}
  return req.database.Card.forge(req.body)
    .save()
    .then(result => {
      return result.load(["labels", "createdBy", "assignedTo", "cardImages"]);
    })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/:cardID", (req, res) => {
  return req.database.Card.where({ id: req.params.cardID })
    .fetch({ withRelated: ["labels", "createdBy", "assignedTo", "cardImages"] })
    .then(result => {
      return res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
