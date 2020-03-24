exports.up = function(knex) {
  return knex.schema.createTable("labels", table => {
    table.increments();
    table.string("name");
    table.string("color");
    table
      .integer("board_id")
      .references("boards.id")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("labels");
};
