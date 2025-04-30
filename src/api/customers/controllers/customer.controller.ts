import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateCustomerUseCase } from '../use-cases/create-customer.use-case';
import { CreateCustomerDto } from '../dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly createCustomerUseCase: CreateCustomerUseCase) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.createCustomerUseCase.execute(createCustomerDto);
  }
}
