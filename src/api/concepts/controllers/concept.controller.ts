import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CreateConceptUseCase } from "../use-cases/create-concept.use-case";
import { CreateConceptDto } from "../dto/create-concept.dto";
import { GetConceptsUseCase } from "../use-cases/get-concept.use-case";


@Controller('concepts')
export class ConceptController {
  constructor(
    private readonly createConceptUseCase: CreateConceptUseCase,
    private readonly getConceptsUseCase: GetConceptsUseCase,
  ) {}

  @Post()
  async create(@Body() createConceptDto: CreateConceptDto) {
    return await this.createConceptUseCase.execute(createConceptDto);
  }

  @Get()
  async findAllByKeyAndOwnerId(
    @Query('key') key: string,
    @Query('ownerId') ownerId: string,
  ) {
    return await this.getConceptsUseCase.getAllByKeyAndDocId(key, ownerId);
  }

}