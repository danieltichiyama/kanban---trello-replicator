exports.up = function(knex) {
  return knex.schema.createTable("lists", table => {
    table.increments();
    table.string("name").notNullable();
    table.integer("order").notNullable();
    table.integer("board_id").references("boards.id");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("lists");
};
