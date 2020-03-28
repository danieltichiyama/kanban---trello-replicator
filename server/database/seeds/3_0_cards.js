exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cards")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("cards").insert([
        {
          name: "Welcome to the tutorial board.",
          details:
            "Click on any of the cards menus to see more information about what they're talking about.",
          position: 1,
          board_id: 1,
          list_id: 1,
          created_by: 1
        },
        {
          name:
            "Click on my menu button ••• to find out more about editing cards.",
          details:
            "Here you can change all sorts of things for this or any card.  Add labels, change which list it appears in, assign the card to someone in the team, or archive the card if you're done with it.  There's still more so be sure to check it out.",
          position: 2,
          board_id: 1,
          list_id: 1,
          created_by: 1
        },
        {
          name:
            "You can also click and drag any of the cards or lists to any order you want.",
          details:
            "Simply click the top of any list or card and drag it to the position you want it in.  Try keeping track of the features you've used by moving these cards around!",
          position: 3,
          board_id: 1,
          list_id: 1,
          created_by: 1
        },
        {
          name: "Add new lists and cards to your board in a snap!",
          details:
            "You can use the input at the far right of your lists to add another.  You can also use the input at the bottom of any list to add a new card.",
          position: 4,
          board_id: 1,
          list_id: 1,
          created_by: 1
        },
        {
          name: "Clicking on the board menu gives you more options.",
          details:
            "In the board menu, you can add other users as collaborators, edit and save label names, and see cards and lists that have been archived.",
          position: 5,
          board_id: 1,
          list_id: 1,
          created_by: 1
        },
        {
          name: "Clicking on your profile icon also gives you more options.",
          details:
            "In the profile menu, you can edit your user information, see a list of cards you've been assigned to do, and of course, log out.",
          position: 6,
          board_id: 1,
          list_id: 1,
          created_by: 1
        }
      ]);
    });
};
