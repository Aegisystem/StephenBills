import { Injectable, Inject } from '@nestjs/common';
import { Customer } from '../domain/entities/customer.entity';
import { CustomerRepository } from '../domain/repositories/customer.repository';
import { DB } from '../../../config/db.provider';
import { Kysely, Insertable } from 'kysely';
import { DocumentType } from 'src/api/shared/domain/document-type.enum';
import { PersonType } from 'src/api/shared/domain/person-type.enum';

interface Address {
  city: string;
  department: string;
  country: string;
  address: string;
}

interface CustomerRow {
  id: number;
  document_id: string;
  document_type: DocumentType;
  verification_digit: number;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  email: string;
  phone?: string;
  address?: Address;
  person_type: PersonType;
  user_owner_id?: string;
  is_consortium: boolean;
  created_at: Date;
  updated_at: Date;
}

interface Database {
  customers: CustomerRow;
}

@Injectable()
export class CustomerRepositoryImpl implements CustomerRepository {
  constructor(
    @Inject(DB)
    private readonly db: Kysely<Database>,
  ) {}

  async save(customer: Customer): Promise<void> {
    const row = this.toRow(customer);

    if (customer.id) {
      await this.db
        .updateTable('customers')
        .set(row)
        .where('id', '=', customer.id)
        .execute();
    } else {
      await this.db
        .insertInto('customers')
        .values(row as Insertable<CustomerRow>)
        .execute();
    }
  }

  async findById(id: BigInt): Promise<Customer | null> {
    const row = await this.db
      .selectFrom('customers')
      .selectAll()
      .where('id', '=', Number(id))
      .executeTakeFirst();

    return row ? this.toEntity(row) : null;
  }

  async findByDocId(doc: string): Promise<Customer | null> {
    const row = await this.db
      .selectFrom('customers')
      .selectAll()
      .where('document_id', '=', doc)
      .executeTakeFirst();
    
      return row ? this.toEntity(row): null
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const row = await this.db
      .selectFrom('customers')
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirst();

    return row ? this.toEntity(row) : null;
  }

  async findAll(): Promise<Customer[]> {
    const rows = await this.db.selectFrom('customers').selectAll().execute();
    return rows.map(this.toEntity);
  }

  async delete(id: BigInt): Promise<void> {
    await this.db.deleteFrom('customers').where('id', '=', Number(id)).execute();
  }

  private toRow(customer: Customer): Omit<CustomerRow, 'id' | 'created_at' | 'updated_at'> {
    return {
      document_id: customer.documentId,
      document_type: customer.documentType,
      verification_digit: customer.verificationDigit,
      first_name: customer.firstName,
      last_name: customer.lastName,
      company_name: customer.companyName,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      person_type: customer.personType,
      user_owner_id: customer.userOwnerId,
      is_consortium: customer.isConsortium,
    };
  }

  private toEntity = (row: CustomerRow): Customer =>
    new Customer({
      id: row.id,
      documentId: row.document_id,
      documentType: row.document_type,
      verificationDigit: row.verification_digit,
      firstName: row.first_name,
      lastName: row.last_name,
      companyName: row.company_name,
      email: row.email,
      phone: row.phone,
      address: row.address,
      personType: row.person_type,
      userOwnerId: row.user_owner_id,
      isConsortium: row.is_consortium,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
}
