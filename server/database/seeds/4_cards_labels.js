exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cards_labels")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("cards_labels").insert([
        { card_id: 1, label_id: 1 },
        { card_id: 1, label_id: 2 },
        { card_id: 2, label_id: 1 },
        { card_id: 3, label_id: 3 }
      ]);
    });
};
