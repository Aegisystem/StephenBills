import { Module } from '@nestjs/common';
import { CustomersController } from './controllers/customer.controller';
import { CreateCustomerUseCase } from './use-cases/create-customer.use-case';
import { CustomerRepositoryImpl } from './infraestructure/customer.repository.impl';
import { CustomerRepository } from './domain/repositories/customer.repository';

@Module({
  controllers: [CustomersController],
  providers: [
    CreateCustomerUseCase,
    {
      provide: CustomerRepository,
      useClass: CustomerRepositoryImpl,
    },
  ],
  exports: [CustomerRepository],
})
export class CustomerModule {} 