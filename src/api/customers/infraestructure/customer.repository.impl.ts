import { Injectable, Inject } from '@nestjs/common';
import { Customer } from '../domain/entities/customer.entity';
import { CustomerRepository } from '../domain/repositories/customer.repository';
import { DB } from '../../../config/db.provider';
import { Kysely, Insertable } from 'kysely';

interface Database {
  customers: Customer;
}

@Injectable()
export class CustomerRepositoryImpl implements CustomerRepository {
  constructor(
    @Inject(DB)
    private readonly db: Kysely<Database>,
  ) {}

  async save(customer: Customer): Promise<void> {
    const { id, createdAt, updatedAt, ...row } = customer;

    if (customer.id) {
      await this.db
        .updateTable('customers')
        .set(row)
        .where('id', '=', customer.id)
        .execute();
    } else {
      await this.db
        .insertInto('customers')
        .values(row as Insertable<Customer>)
        .execute();
    }
  }

  async findById(id: BigInt): Promise<Customer | null> {
    const row = await this.db
      .selectFrom('customers')
      .selectAll()
      .where('id', '=', Number(id))
      .executeTakeFirst();

    return row ? row : null;
  }

  async findByDocId(doc: string): Promise<Customer | null> {
    const row = await this.db
      .selectFrom('customers')
      .selectAll()
      .where('documentId', '=', doc)
      .executeTakeFirst();
    
      return row ? row : null
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const row = await this.db
      .selectFrom('customers')
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirst();

    return row ? row : null;
  }

  async findAll(): Promise<Customer[]> {
    const rows = await this.db.selectFrom('customers').selectAll().execute();
    return rows
  }

  async delete(id: BigInt): Promise<void> {
    await this.db.deleteFrom('customers').where('id', '=', Number(id)).execute();
  }
}
