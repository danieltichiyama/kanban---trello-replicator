exports.up = function(knex) {
  return knex.schema.createTable("boardImages", table => {
    table.increments();
    table.string("url").notNullable();
    table.integer("board_id").references("boards.id");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("boardImages");
};
