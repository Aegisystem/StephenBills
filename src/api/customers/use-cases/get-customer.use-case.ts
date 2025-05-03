import { Injectable } from '@nestjs/common';
import { Customer } from '../domain/entities/customer.entity';
import { CustomerRepository } from '../domain/repositories/customer.repository';

@Injectable()
export class GetCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(docId: string): Promise<Customer | null> {
   
    const customer = await this.customerRepository.findByDocId(docId);

    return customer;
  }
}