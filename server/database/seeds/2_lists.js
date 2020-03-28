exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("lists")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("lists").insert([
        { name: "To Do", position: 1, board_id: 1, is_archived: false },
        { name: "Doing", position: 2, board_id: 1, is_archived: false },
        { name: "Done", position: 3, board_id: 1, is_archived: false }
      ]);
    });
};
