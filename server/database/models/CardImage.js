const bookshelf = require("../bookshelf");

class CardImage extends bookshelf.Model {
  get tableName() {
    return "cardImages";
  }

  get hasTimestamps() {
    return true;
  }

  card() {
    return this.belongsTo("Card");
  }
}

module.exports = bookshelf.model("CardImage", CardImage);
