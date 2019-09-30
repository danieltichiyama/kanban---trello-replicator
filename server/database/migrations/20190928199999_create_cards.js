exports.up = function(knex) {
  return knex.schema.createTable("cards", table => {
    table.increments();
    table.string("title", 255).notNullable();
    table.string("body", 1024).notNullable();
    table
      .integer("priority_id")
      .references("priorities.id")
      .notNullable();
    table
      .integer("status_id")
      .references("statuses.id")
      .notNullable();
    table
      .integer("created_by")
      .references("users.id")
      .notNullable();
    table.integer("assigned_to").references("users.id");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("cards");
};
