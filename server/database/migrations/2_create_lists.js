exports.up = function(knex) {
  return knex.schema.createTable("lists", table => {
    table.increments();
    table.string("name").notNullable();
    table.decimal("position", null).notNullable();
    table.integer("board_id").references("boards.id");
    table.boolean("is_archived").defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("lists");
};
