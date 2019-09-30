const User = require("./models/Users");

module.exports = function(res, req, next) {
  req.database = {
    User
  };

  next();
};
