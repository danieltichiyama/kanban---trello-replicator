exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("boardImages")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("boardImages").insert([
        {
          url:
            "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1655&q=80",
          board_id: 1
        },
        {
          url:
            "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
          board_id: 2
        },
        {
          url:
            "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60",
          board_id: 3
        }
      ]);
    });
};
