exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("lists")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("lists").insert([
        { name: "Queued", order: 1, board_id: 1 },
        { name: "In Progress", order: 2, board_id: 1 },
        { name: "In Review", order: 3, board_id: 1 },
        { name: "Completed", order: 4, board_id: 1 }
      ]);
    });
};
