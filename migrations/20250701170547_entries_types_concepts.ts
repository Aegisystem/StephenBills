import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("entries", (table) => {
    table.string("owner_id").alter();
    table.string("third_party_id").alter();
  });

  await knex.schema.createTable("concepts", (table) => {
    table.bigIncrements('id').primary();
    table.string("owner_id").nullable();
    table.string("key").notNullable();
    table.enu("natural_behavior", ["credit", "debit"]).notNullable();
    table.boolean("editable").defaultTo(true).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
  });

  await knex.raw(`
    CREATE INDEX IF NOT EXISTS idx_concepts_key_trgm
    ON concepts
    USING GIN (key gin_trgm_ops)
  `);
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("entries", (table) => {
    table.bigInteger("owner_id").alter();
    table.bigInteger("third_party_id").alter();
  });

  await knex.schema.dropTableIfExists("concept");

  await knex.raw(`DROP INDEX IF EXISTS idx_concepts_key_trgm`);
}

