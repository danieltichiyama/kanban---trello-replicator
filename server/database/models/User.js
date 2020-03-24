const bookshelf = require("../bookshelf");

class User extends bookshelf.Model {
  get tableName() {
    return "users";
  }

  get hasTimestamps() {
    return true;
  }

  userImage() {
    return this.hasOne("UserImage");
  }

  boards() {
    return this.hasMany("Board", "created_by");
  }

  cardsCreated() {
    return this.hasMany("Card", "created_by");
  }

  cardsAssigned() {
    return this.hasMany("Card", "assigned_to");
  }

  collaborations() {
    return this.belongstoMany(
      "Board",
      "boards_collaborators",
      "collaborator_id",
      "board_id"
    );
  }
}

module.exports = bookshelf.model("User", User);
