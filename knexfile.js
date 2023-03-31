const { loadEnvConfig } = require('@next/env').loadEnvConfig('./');

const knexConfig = {
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        timezone: 'UTC'
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        directory: 'knex/migrations'
    },
  };

  module.exports = knexConfig;