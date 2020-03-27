exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("labels")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("labels").insert([
        { board_id: 1, color: "#61be4f", name: "MVP" },
        { board_id: 1, color: "#f2d600", name: "Urgent" },
        { board_id: 1, color: "#ff9f1a" },
        { board_id: 1, color: "#eb5946" },
        { board_id: 1, color: "#c377e0" },
        { board_id: 1, color: "#0079bf" },
        { board_id: 1, color: "#00c2e0" },
        { board_id: 1, color: "#ff77cb" },
        { board_id: 1, color: "#344562" }
      ]);
    });
};
