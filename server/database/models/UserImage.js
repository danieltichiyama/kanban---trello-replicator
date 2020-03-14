const bookshelf = require("../bookshelf");

class UserImage extends bookshelf.Model {
  get tableName() {
    return "userImages";
  }

  get hasTimestamps() {
    return true;
  }

  user() {
    return this.belongsTo("User");
  }
}

module.exports = bookshelf.model("UserImage", UserImage);
