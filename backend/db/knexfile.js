// Update with your config settings.
import dotenv from 'dotenv';
dotenv.config(dotenv.config({ path: '../.env' }));

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const config = {

  development: {
    client: 'postgresql',
    connection: {
       host: process.env.DEV_DB_HOST,
       database: process.env.DEV_DB_NAME,
       user: process.env.DEV_DB_USERNAME,
       password: process.env.DEV_DB_PASSWORD
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}
console.log("Connection:", config['development']);
// const db = knex(development);


export default config // Export the configured knex instance