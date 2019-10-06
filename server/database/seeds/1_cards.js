exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cards")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("cards").insert([
        {
          title: "Card One",
          body:
            "This is a seeded card. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          priority_id: 1,
          status_id: 1,
          created_by: 1,
          assigned_to: 1
        },
        {
          title: "Card Two",
          body:
            "This is a seeded card.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          priority_id: 2,
          status_id: 1,
          created_by: 2,
          assigned_to: 2
        },
        {
          title: "Card Three",
          body:
            "This is a seeded card.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          priority_id: 3,
          status_id: 1,
          created_by: 3,
          assigned_to: 3
        }
      ]);
    });
};
