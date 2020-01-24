exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("boards")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("boards").insert([
        {
          name: "React-Kanban",
          description: "A board for this board.",
          created_by: 1
        },
        {
          name: "Job Search",
          description: "A board for the job search.",
          created_by: 1
        },
        {
          name: "Random Stuff",
          description: "A board for random stuff.",
          created_by: 1
        }
      ]);
    });
};
