import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`CREATE EXTENSION IF NOT EXISTS pg_trgm`);

  await knex.raw(`
    CREATE INDEX IF NOT EXISTS idx_entries_concept_trgm
    ON entries
    USING GIN (concept gin_trgm_ops)
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP INDEX IF EXISTS idx_entries_concept_trgm`);
}