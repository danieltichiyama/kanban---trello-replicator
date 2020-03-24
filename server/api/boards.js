const express = require("express");
//used to create a transaction in post route
const Promise = require("bluebird");
const bookshelf = require("../database/bookshelf");
//used to create a transaction in post route

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
  return bookshelf
    .transaction(t => {
      let boardData = { ...req.body };

      if (boardData.url) {
        delete boardData.url;
      }

      return req.database.Board.where({ id: req.params.id })
        .save(boardData, { method: "update", patch: true, transacting: t })
        .tap(model => {
          if (req.body.url) {
            return req.database.BoardImage.where({ board_id: model.id }).save(
              { board_id: model.id, url: req.body.url },
              { method: "update", patch: true, transacting: t }
            );
          }
        });
    })
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
  return bookshelf
    .transaction(t => {
      let boardData = { ...req.body };

      if (boardData.url) {
        delete boardData.url;
      }

      // the 't' is used as part of any interaction with the database, i.e. save({transacting: t})
      return req.database.Board.forge(boardData)
        .save(null, { transacting: t })
        .tap(model => {
          //.tap is a bluebird specific method that allows you to use the model you created without returning a different result (like .then() would);
          let labels = [
            { color: "#61be4f" },
            { color: "#f2d600" },
            { color: "#ff9f1a" },
            { color: "#eb5946" },
            { color: "#c377e0" },
            { color: "#0079bf" },
            { color: "#00c2e0" },
            { color: "#ff77cb" },
            { color: "#344562" }
          ];

          return Promise.map(labels, label => {
            return req.database.Label.forge(label).save(
              { board_id: model.id },
              {
                transacting: t
              }
            );
          });
        })
        .tap(model => {
          return req.database.BoardImage.forge({
            url: req.body.url
          }).save({ board_id: model.id }, { transacting: t });
        });
    })
    .then(results => {
      return results.load("boardImage");
    })
    .then(results => {
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
        "lists",
        "collaborators"
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
