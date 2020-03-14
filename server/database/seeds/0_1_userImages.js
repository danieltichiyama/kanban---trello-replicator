exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("userImages")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("userImages").insert([
        { url: "https://i.ibb.co/W6Dyy07/headshot-round.png", user_id: 1 }
      ]);
    });
};
