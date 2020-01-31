exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("labels")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("labels").insert([
        { board_id: 1, color: "#218b8d", name: "MVP" },
        { board_id: 1, color: "#6bcdcc", name: "URGENT" },
        { board_id: 1, color: "#f8e559", name: "Stretch" }
      ]);
    });
};
