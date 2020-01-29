exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cards")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("cards").insert([
        {
          name: "Make the board",
          details: "This is a seeded card.",
          position: 1,
          list_id: 2,
          created_by: 1,
          assigned_to: 1
        },
        {
          name: "Make the board better",
          details: "This is a seeded card.",
          position: 1,
          list_id: 1,
          created_by: 1,
          assigned_to: 1
        },
        {
          name: "Make the board like trello.",
          details: "This is a seeded card.",
          position: 2,
          list_id: 1,
          created_by: 1,
          assigned_to: 1
        },
        {
          name: "Setup database seeds and migrations",
          details: "This is a seeded card.",
          position: 1,
          list_id: 3,
          created_by: 1,
          assigned_to: 1
        }
      ]);
    });
};
