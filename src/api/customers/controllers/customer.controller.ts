import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateCustomerUseCase } from '../use-cases/create-customer.use-case';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { GetCustomerUseCase } from '../use-cases/get-customer.use-case';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly getCustomerUseCase: GetCustomerUseCase
  ) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.createCustomerUseCase.execute(createCustomerDto);
  }

  @Get(':docId')
  async get(@Param('docId') docId: string) {
    return await this.getCustomerUseCase.execute(docId);
  }
}
