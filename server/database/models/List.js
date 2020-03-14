const bookshelf = require("../bookshelf");

class List extends bookshelf.Model {
  get tableName() {
    return "lists";
  }

  get hasTimestamps() {
    return true;
  }

  cards() {
    return this.hasMany("Card");
  }

  board() {
    return this.belongsTo("Board", "board_id");
  }
}

module.exports = bookshelf.model("List", List);
