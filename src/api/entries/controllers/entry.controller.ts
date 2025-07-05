import { Body, Controller, Post } from "@nestjs/common";
import { CreateEntryUseCase } from "../use-cases/create-entry.use-case";
import { CreateEntryDto } from "../dto/create-entry.dto";


@Controller('entries')
export class EntryController {
  constructor(
    private readonly createEntryUseCase: CreateEntryUseCase,
  ) {}

  @Post()
  async create(@Body() createEntryDto: CreateEntryDto) {
    return await this.createEntryUseCase.execute(createEntryDto);
  }
}