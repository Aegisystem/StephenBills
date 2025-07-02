import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { Customer } from '../domain/entities/customer.entity';
import { CustomerRepository } from '../domain/repositories/customer.repository';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { PersonType } from 'src/api/shared/domain/person-type.enum';

@Injectable()
export class CreateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  private async checkIfCustomerExistsByDocumentId(documentId: string): Promise<Boolean> {
    return await this.customerRepository.findByDocId(documentId) !== null;
  }

  async execute(dto: CreateCustomerDto): Promise<Customer> {
   
    const existingCustomer = await this.checkIfCustomerExistsByDocumentId(dto.documentId);
    if (existingCustomer) {
      throw new ConflictException('Customer with this document ID already exists');
    }

    if (dto.personType === PersonType.JURIDICA) {
      if (!dto.companyName) {
        throw new BadRequestException('Company name is required for company customers');
      }
    } else if (dto.personType === PersonType.NATURAL) {
      if (!dto.firstName || !dto.lastName) {
        throw new BadRequestException('First and last name are required for person customers');
      }
    } else {
      throw new BadRequestException('Invalid person type');
    }

    const customer = new Customer(dto);

    await this.customerRepository.save(customer);

    return customer;
  }
}