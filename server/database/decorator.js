const User = require("./models/User");
const Card = require("./models/Card");
const List = require("./models/List");
const Label = require("./models/Label");
const Board = require("./models/Board");
const CardImage = require("./models/CardImage");
const UserImage = require("./models/UserImage");
const BoardImage = require("./models/BoardImage");

module.exports = function(req, res, next) {
  req.database = {
    User,
    Card,
    List,
    Label,
    Board,
    CardImage,
    UserImage,
    BoardImage
  };

  next();
};
