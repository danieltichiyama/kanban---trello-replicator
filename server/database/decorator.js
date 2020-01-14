const User = require("./models/User");
const Card = require("./models/Card");
const Status = require("./models/Status");

module.exports = function(req, res, next) {
  req.database = {
    User,
    Card,
    Status
  };

  next();
};
