const express = require("express");

const router = express.Router();

router.get("/smoke", (req, res) => {
  return res.send("There's smoke in the users router.");
});

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
    .fetchAll({ columns: ["username", "firstname", "lastname", "id"] })
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
        "cardsAssigned.board.lists",
        "cardsAssigned.labels",
        "cardsAssigned.list",
        "cardsAssigned.assignedTo",
        "cardsAssigned.cardImages",
        "cardsAssigned.createdBy",
        "collaborations.boardImage",
        "boards.labels"
      ],
      columns: [
        "username",
        "firstname",
        "id",
        "lastname",
        "email",
        "created_at"
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
