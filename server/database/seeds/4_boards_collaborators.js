exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("boards_collaborators")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("boards_collaborators").insert([]);
    });
};
