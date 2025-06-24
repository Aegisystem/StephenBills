import { Provider } from '@nestjs/common';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

export const DB = 'DB';

export const dbProvider: Provider = {
  provide: DB,
  useFactory: () => {
    const dialect = new PostgresDialect({
      pool: new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.DB_SSL_CA
          ? {
              rejectUnauthorized: true,
              ca: require('fs').readFileSync(process.env.DB_SSL_CA).toString(),
            }
          : false,
      }),
    });

    return new Kysely({
      dialect,
      plugins: [new CamelCasePlugin()],
    });
  },
}; 