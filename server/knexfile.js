// Update with your config settings.
const path = require("path");
require("dotenv").config({ path: "../.env" });

module.exports = {
  client: "postgresql",
  connection: {
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOSTNAME
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./database/migrations"
  },
  seeds: {
    directory: "./database/seeds"
  }
};
