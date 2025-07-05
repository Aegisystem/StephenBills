import { Injectable, NotFoundException } from '@nestjs/common';import { CustomerRepository } from '../domain/repositories/customer.repository';

@Injectable()
export class GetCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(id: bigint): Promise<void> {

    const customer = await this.customerRepository.findById(id);
    if(!customer) throw new NotFoundException("Customer not found");

    await this.customerRepository.delete(id);
  }
}