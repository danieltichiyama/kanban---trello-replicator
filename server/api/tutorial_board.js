//this is used to generate a new board for newly registered users.

module.exports = tutorialBoard = {
  board: {
    name: "Tutorial Board",
    description:
      "This board can guide you through the various features of this productivity app."
  },
  cards: [
    {
      name: "Welcome to the tutorial board.",
      details:
        "Click on any of the cards menus to see more information about what they're talking about.",
      position: 1,
      labels: [0]
    },
    {
      name: "Click on my menu button ••• to find out more about editing cards.",
      details:
        "Here you can change all sorts of things for this or any card.  Add labels, change which list it appears in, assign the card to someone in the team, or archive the card if you're done with it.  There's still more so be sure to check it out.",
      position: 2,
      labels: [0, 1]
    },
    {
      name:
        "You can also click and drag any of the cards or lists to any order you want.",
      details:
        "Simply click the top of any list or card and drag it to the position you want it in.  Try keeping track of the features you've used by moving these cards around!",
      position: 3,
      labels: [0]
    },
    {
      name: "Add new lists and cards to your board in a snap!",
      details:
        "You can use the input at the far right of your lists to add another.  You can also use the input at the bottom of any list to add a new card.",
      position: 4,
      labels: [0, 1]
    },
    {
      name: "Clicking on the board menu gives you more options.",
      details:
        "In the board menu, you can add other users as collaborators, edit and save label names, and see cards and lists that have been archived.",
      position: 5,
      labels: [2]
    },
    {
      name: "Clicking on your profile icon also gives you more options.",
      details:
        "In the profile menu, you can edit your user information, see a list of cards you've been assigned to do, and of course, log out.",
      position: 6,
      labels: [2]
    }
  ],
  labels: [
    { color: "#61be4f", name: "MVP" },
    { color: "#f2d600", name: "Urgent" },
    { color: "#ff9f1a", name: "Stretch" },
    { color: "#eb5946" },
    { color: "#c377e0" },
    { color: "#0079bf" },
    { color: "#00c2e0" },
    { color: "#ff77cb" },
    { color: "#344562" }
  ],
  lists: [
    { name: "To Do", position: 1, is_archived: false },
    { name: "Doing", position: 2, is_archived: false },
    { name: "Done", position: 3, is_archived: false }
  ],
  boardImage: {
    url:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1655&q=80"
  },
  cards_labels: [
    { card_id: 1, label_id: 1 },
    { card_id: 2, label_id: 2 },
    { card_id: 4, label_id: 3 },
    { card_id: 2, label_id: 1 },
    { card_id: 3, label_id: 1 }
  ]
};
