exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cards")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("cards").insert([
        {
          title: "TODO One",
          body: "This is a todo card.",
          priority_id: 1,
          status_id: 1,
          created_by: 1,
          assigned_to: 4
        },
        {
          title: "TODO Two",
          body: "This is a todo card.",
          priority_id: 2,
          status_id: 1,
          created_by: 2,
          assigned_to: 4
        },
        {
          title: "TODO Three",
          body: "This is a todo card.",
          priority_id: 3,
          status_id: 1,
          created_by: 3,
          assigned_to: 4
        }
      ]);
    });
};
