exports.up = function(knex) {
  return knex.schema.createTable("statuses", table => {
    table.increments();
    table.string("name").notNullable();
    table.integer("rank").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("statuses");
};
