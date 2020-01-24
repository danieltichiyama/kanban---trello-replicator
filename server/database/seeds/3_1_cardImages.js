exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cardImages")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("cardImages").insert([
        {
          url:
            "https://i.ibb.co/544ntrh/Screen-Shot-2020-01-24-at-10-25-39-AM.png",
          card_id: 3
        },
        {
          url:
            "https://i.ibb.co/MCp2b19/Screen-Shot-2020-01-24-at-10-26-58-AM.png",
          card_id: 3
        }
      ]);
    });
};
