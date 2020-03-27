exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cardImages")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("cardImages").insert([]);
    });
};
