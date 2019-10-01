const User = require("./models/User");
const Card = require("./models/Card");

module.exports = function(req, res, next) {
  req.database = {
    User: User,
    Card: Card
  };

  next();
};
