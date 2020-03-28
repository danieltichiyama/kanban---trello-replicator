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
      position: 1
    },
    {
      name: "Click on my menu button to find out more about editing cards. -->",
      details:
        "Here you can change all sorts of things for this or any card.  Add labels, change which list it appears in, assign the card to someone in the team, or archive the card if you're done with it.  There's still more so be sure to check it out.",
      position: 2
    },
    {
      name:
        "You can also click and drag any of the cards or lists to any order you want.",
      details:
        "Simply click the top of any list or card and drag it to the position you want it in.  Try keeping track of the features you've used by moving these cards around!",
      position: 3
    },
    {
      name: "Add new lists and cards to your board in a snap!",
      details:
        "You can use the input at the far right of your lists to add another.  You can also use the input at the bottom of any list to add a new card.",
      position: 4
    },
    {
      name: "Clicking on the board menu gives you more options.",
      details:
        "In the board menu, you can add other users as collaborators, edit and save label names, and see cards and lists that have been archived.",
      position: 5
    },
    {
      name: "Clicking on your profile icon also gives you more options.",
      details:
        "In the profile menu, you can edit your user information, see a list of cards you've been assigned to do, and of course, log out.",
      position: 6
    }
  ],
  labels: [
    { color: "#61be4f", name: "MVP" },
    { color: "#f2d600", name: "Urgent" },
    { color: "#ff9f1a" },
    { color: "#eb5946" },
    { color: "#c377e0" },
    { color: "#0079bf" },
    { color: "#00c2e0" },
    { color: "#ff77cb" },
    { color: "#344562" }
  ],
  lists: [
    { name: "Queued", position: 1, is_archived: false },
    { name: "In Progress", position: 2, is_archived: false },
    { name: "Drag me!", position: 4, is_archived: false },
    { name: "Completed", position: 3, is_archived: false }
  ],
  boardImages: [
    {
      url:
        "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1655&q=80"
      //   board_id: 1
    }
  ]
};
