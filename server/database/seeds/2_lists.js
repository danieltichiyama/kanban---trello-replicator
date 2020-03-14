exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("lists")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("lists").insert([
        { name: "Queued", position: 1, board_id: 1, is_archived: false },
        { name: "In Progress", position: 2, board_id: 1, is_archived: false },
        { name: "In Review", position: 3, board_id: 1, is_archived: false },
        { name: "Completed", position: 4, board_id: 1, is_archived: false }
      ]);
    });
};
