require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "smarterp",
      port: Number(process.env.DB_PORT) || 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./src/db/migrations"
    },
    seeds: {
      directory: "./src/db/seeds"
    }
  },

  staging: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT) || 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    },
    seeds: {
      directory: "./src/db/seeds"
    }
  },

  production: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT) || 5432,

      // important for cloud DBs (Render, AWS, Railway, Heroku, etc.)
      ssl: process.env.DB_SSL === "true"
        ? { rejectUnauthorized: false }
        : false
    },
    pool: {
      min: 2,
      max: 20
    },
    migrations: {
      tableName: "knex_migrations"
    },
    seeds: {
      directory: "./src/db/seeds"
    }
  }

};