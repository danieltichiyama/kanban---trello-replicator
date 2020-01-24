exports.up = function(knex) {
  return knex.schema.createTable("userImages", table => {
    table.increments();
    table.string("url").notNullable();
    table.integer("user_id").references("users.id");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("userImages");
};
