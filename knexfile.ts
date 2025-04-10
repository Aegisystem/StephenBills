import type { Knex } from 'knex';
import * as dotenv from 'dotenv';
import dbConfig from './src/config/dbConfig';

dotenv.config();

const config = {
  client: 'postgresql',
  connection: {
    connectionString: dbConfig().database.url,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
} satisfies Knex.Config;

export default config;
