import { Injectable } from "@nestjs/common";
import { EntryRepository } from "../domain/repositories/entry.repository";
import { CreateEntryDto } from "../dto/create-entry.dto";
import { Entry } from "../domain/entities/entry.entity";


@Injectable()
export class CreateEntryUseCase {
  constructor(
    private readonly entryRepository: EntryRepository,
  ) {}

  async execute(dto: CreateEntryDto): Promise<Entry> {
    //TODO: Validate the concept of the entry
    const entry = new Entry(dto)
    await this.entryRepository.save(entry);
    return entry;
  }
}