exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("priorities")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("priorities").insert([
        { name: "Low", rank: 1 },
        { name: "Medium", rank: 2 },
        { name: "High", rank: 3 },
        { name: "Blocker", rank: 4 }
      ]);
    });
};
