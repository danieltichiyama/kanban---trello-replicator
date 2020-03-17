exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table.string("first_name");
    table.string("last_name");
    table.string("email");
    table
      .string("username")
      .notNullable()
      .unique();
    table.string("password").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
