exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("boards")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("boards").insert([
        {
          name: "Tutorial Board",
          description:
            "This board can guide you through the various features of this productivity app.",
          created_by: 1
        }
      ]);
    });
};
