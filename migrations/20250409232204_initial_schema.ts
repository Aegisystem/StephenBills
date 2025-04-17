import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('customers', (table: Knex.TableBuilder) => {
    table.bigIncrements('id').primary();
    table.string('document_id', 20).notNullable().unique();
    table.string('document_type', 10).notNullable();
    table.integer('verification_digit', 1).notNullable();
    table.string('first_name', 100);
    table.string('last_name', 100);
    table.string('company_name', 100);
    table.string('email', 100).notNullable();
    table.string('phone', 20);
    table.jsonb('address');
    table.string('person_type').notNullable()
    table.boolean('is_consortium').defaultTo(false);
    table.timestamps(true, true);
  });

  await knex.schema.createTable('entries', (table: Knex.TableBuilder) => {
    table.bigIncrements('id').primary();
    table.bigInteger('owner_id').notNullable();
    table.string('concept', 50).notNullable();
    table.decimal('credit', 10, 2).notNullable();
    table.decimal('debit', 10, 2).notNullable();
    table.date('issue_date').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('customers');
  await knex.schema.dropTable('entries');
}
