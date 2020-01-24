const bookshelf = require("../bookshelf");

class BoardImage extends bookshelf.Model {
  get tableName() {
    return "boardImages";
  }

  get hasTimestamps() {
    return true;
  }

  board() {
    return this.belongsTo("Board");
  }
}

module.exports = bookshelf.model("BoardImage", BoardImage);
