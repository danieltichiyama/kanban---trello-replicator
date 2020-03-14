const bookshelf = require("../bookshelf");

class Card extends bookshelf.Model {
  get tableName() {
    return "cards";
  }

  get hasTimestamps() {
    return true;
  }

  createdBy() {
    return this.belongsTo("User", "created_by");
  }

  assignedTo() {
    return this.belongsTo("User", "assigned_to");
  }

  list() {
    return this.belongsTo("List", "list_id");
  }

  labels() {
    return this.belongsToMany("Label");
  }

  cardImages() {
    return this.hasMany("CardImage");
  }

  board() {
    return this.belongsTo("Board", "board_id");
  }
}

module.exports = bookshelf.model("Card", Card);
