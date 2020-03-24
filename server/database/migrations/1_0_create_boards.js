exports.up = function(knex) {
  return knex.schema.createTable("boards", table => {
    table.increments();
    table.string("name").notNullable();
    table.string("description");
    table.boolean("is_archived").defaultTo(false);
    table
      .integer("created_by")
      .references("users.id")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("boards");
};
