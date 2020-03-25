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
  console.log(req.body);
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
      console.log("error updating user");
      console.log(err);
    });
});

router.get("/all", (req, res) => {
  let term = "%" + req.query.search + "%";
  return req.database.User.query(qb => {
    qb.where("firstname", "LIKE", term)
      .orWhere("lastname", "LIKE", term)
      .orWhere("username", "LIKE", term);
  })
    .fetchAll()
    .then(results => {
      return res.json(results);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/:userID", (req, res) => {
  return req.database.User.where({ id: req.params.userID })
    .fetch({
      withRelated: [
        "userImage",
        "boards.boardImage",
        "boards.collaborators",
        "cardsAssigned",
        "collaborations.boardImage"
      ]
    })
    .then(results => {
      return results.toJSON();
    })
    .then(json => {
      let response = { ...json };

      delete response.password;
      delete response.updated_at;

      return res.json(response);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/smoke", (req, res) => {
  return res.send("There's smoke in the users router.");
});

module.exports = router;
