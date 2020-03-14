exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          first_name: "Daniel",
          last_name: "Ichiyama",
          email: "daniel.ichiyama@gmail.com",
          username: "danielti"
        }
      ]);
    });
};
