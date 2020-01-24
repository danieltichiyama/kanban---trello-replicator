exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("labels")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("labels").insert([
        { name: "MVP", color: "#04c9b5", board_id: 1 },
        { name: "Urgent", color: "#fc4a1a", board_id: 1 },
        { name: "Stretch", color: "#fac611", board_id: 1 }
      ]);
    });
};
