exports.up = function(knex) {
  return knex.schema.createTable("boards_collaborators", table => {
    table
      .integer("board_id")
      .references("boards.id")
      .onDelete("CASCADE");
    table
      .integer("collaborator_id")
      .references("users.id")
      .onDelete("CASCADE");
    table
      .integer("status")
      .defaultTo("1")
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("boards_collaborators");
};
