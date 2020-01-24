const bookshelf = require("../bookshelf");

class Label extends bookshelf.Model {
  get tableName() {
    return "labels";
  }

  get hasTimestamps() {
    return true;
  }

  cards() {
    return this.hasMany("Card");
  }

  board() {
    return this.belongsTo("Board");
  }
}

module.exports = bookshelf.model("Label", Label);
