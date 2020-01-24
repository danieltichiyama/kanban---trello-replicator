exports.up = function(knex) {
  return knex.schema.createTable("cardImages", table => {
    table.increments();
    table.string("url").notNullable();
    table.integer("card_id").references("cards.id");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("cardImages");
};
