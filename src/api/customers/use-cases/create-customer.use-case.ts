import { Injectable } from '@nestjs/common';
import { Customer } from '../domain/entities/customer.entity';
import { CustomerRepository } from '../domain/repositories/customer.repository';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { PersonType } from 'src/api/shared/domain/person-type.enum';

@Injectable()
export class CreateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(dto: CreateCustomerDto): Promise<Customer> {
    // Check if customer with same document ID already exists
    
    const existingCustomer = await this.customerRepository.findByDocId(dto.documentId);
    if (existingCustomer) {
      throw new Error('Customer with this document ID already exists');
    }

    if (dto.personType === PersonType.JURIDICA) {
      if (!dto.companyName) {
        throw new Error('Company name is required for company customers');
      }
    } else if (dto.personType === PersonType.NATURAL) {
      if (!dto.firstName || !dto.lastName) {
        throw new Error('First and last name are required for person customers');
      }
    } else {
      throw new Error('Invalid person type');
    }

    // Create new customer instance
    const customer = new Customer(dto);

    // Save customer to repository
    await this.customerRepository.save(customer);

    return customer;
  }
}