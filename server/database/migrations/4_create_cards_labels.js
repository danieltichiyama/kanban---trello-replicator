exports.up = function(knex) {
  return knex.schema.createTable("cards_labels", table => {
    table
      .integer("label_id")
      .references("labels.id")
      .onDelete("CASCADE");
    table
      .integer("card_id")
      .references("cards.id")
      .onDelete("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("cards_labels");
};
