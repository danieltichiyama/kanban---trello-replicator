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
          email: "daniel.ichiyama@gmail.com"
        },
        {
          first_name: "Emily",
          last_name: "Chong",
          email: "emily_chong@POTUS.us.gov"
        },
        {
          first_name: "Dylan",
          last_name: "Chong",
          email: "misterPickle@msn.com"
        }
      ]);
    });
};
