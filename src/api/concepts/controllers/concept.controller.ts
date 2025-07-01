import { Body, Controller, Post } from "@nestjs/common";
import { CreateConceptUseCase } from "../use-cases/create-concept.use-case";
import { CreateConceptDto } from "../dto/create-concept.dto";


@Controller('concepts')
export class ConceptController {
  constructor(
    private readonly createConceptUseCase: CreateConceptUseCase,
  ) {}

  @Post()
  async create(@Body() createConceptDto: CreateConceptDto) {
    return await this.createConceptUseCase.execute(createConceptDto);
  }
}