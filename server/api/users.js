const express = require("express");

const router = express.Router();

router.delete("/:userID", (req, res) => {
  return req.database.User.where({ id: parseInt(req.params.userID) })
    .destroy()
    .then(results => {
      return res.json(results);
    })
    .catch(err => {
      console.log(err);
    });
});

router.put("/:userID", (req, res) => {
  return req.database.User.where({ id: req.params.userID })
    .save(req.body, { method: "update", patch: true })
    .then(results => {
      let response = { ...results.attributes };
      delete response.password;
      delete response.created_at;
      delete response.updated_at;

      return res.json(response);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/:userID", (req, res) => {
  return req.database.User.where({ id: req.params.userID })
    .fetch({ withRelated: ["userImage", "boards", "cardsAssigned"] })
    .then(results => {
      return res.json(results);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/smoke", (req, res) => {
  return res.send("There's smoke in the users router.");
});

module.exports = router;
