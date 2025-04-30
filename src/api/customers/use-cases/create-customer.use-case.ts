import { Injectable } from '@nestjs/common';
import { Customer } from '../domain/entities/customer.entity';
import { CustomerRepository } from '../domain/repositories/customer.repository';
import { CreateCustomerDto } from '../dto/create-customer.dto';

@Injectable()
export class CreateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(dto: CreateCustomerDto): Promise<Customer> {
    // Check if customer with same document ID already exists
    const existingCustomer = await this.customerRepository.findByDocId(dto.documentId);
    if (existingCustomer) {
      throw new Error('Customer with this document ID already exists');
    }

    // Create new customer instance
    const customer = new Customer(dto);

    // Save customer to repository
    await this.customerRepository.save(customer);

    return customer;
  }
}