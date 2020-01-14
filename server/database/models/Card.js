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

  status() {
    return this.hasOne("Status", "id");
  }
}

module.exports = bookshelf.model("Card", Card);
