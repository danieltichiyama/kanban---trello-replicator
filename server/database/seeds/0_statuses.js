exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("statuses")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("statuses").insert([
        { name: "Queue", rank: 1 },
        { name: "In Progress", rank: 1 },
        { name: "Done", rank: 1 }
      ]);
    });
};
