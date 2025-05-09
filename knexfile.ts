import type { Knex } from 'knex';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const sslCaPath = process.env.DB_SSL_CA;
if (!sslCaPath) {
  throw new Error('DB_SSL_CA environment variable is not defined');
}

const config = {
  client: 'postgresql',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync(sslCaPath).toString()
    },
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
