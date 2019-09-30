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
          first_name: "James",
          last_name: "Bond",
          email: "agent007@mi6.uk.gov"
        },
        {
          first_name: "Abraham",
          last_name: "Lincoln",
          email: "abe_lincoln@us.gov"
        },
        {
          first_name: "Everybody's",
          last_name: "Bitch",
          email: "tool@tool.tool"
        }
      ]);
    });
};
