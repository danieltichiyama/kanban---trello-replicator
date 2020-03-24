const bcrypt = require("bcryptjs");

let password = bcrypt.hashSync("password", 12);

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          firstname: "Daniel",
          lastname: "Ichiyama",
          email: "daniel.ichiyama@gmail.com",
          username: "danielti",
          password: password
        },
        {
          firstname: "Mister",
          lastname: "Pickle",
          email: "mister_pickle@gmail.com",
          username: "mister_pickle",
          password: password
        }
      ]);
    });
};
