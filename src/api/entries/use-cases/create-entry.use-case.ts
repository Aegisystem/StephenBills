import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { EntryRepository } from "../domain/repositories/entry.repository";
import { CreateEntryDto } from "../dto/create-entry.dto";
import { Entry } from "../domain/entities/entry.entity";
import { ConceptRepository } from "src/api/concepts/domain/repositories/concept.repository";
import { CustomerRepository } from "src/api/customers/domain/repositories/customer.repository";


@Injectable()
export class CreateEntryUseCase {
  constructor(
    private readonly entryRepository: EntryRepository,
    private readonly conceptRepository: ConceptRepository
  ) {}

  private async validateConcept(conceptKey: string, ownerId: string): Promise<void> {
    const concept = await this.conceptRepository.findByKeyAndDocId(conceptKey,
      ownerId);
    if (!concept) {
      const globalConcept = await this.conceptRepository.findByKeyAndDocId(conceptKey, "");
      if (!globalConcept) {
        throw new NotFoundException(`Concept with key ${conceptKey} not found`);
      }
    }
  }

  async execute(dto: CreateEntryDto): Promise<Entry> {
    const entry = new Entry(dto)
  
    if (!entry.concept || !entry.ownerId) {
      throw new NotFoundException("Concept and ownerId are required");
    }

    if (
      (entry.debit == null || entry.credit == null) ||
      (entry.debit === 0 && entry.credit === 0)
    ) {
      throw new BadRequestException("The entry is empty, it must have either debit or credit value.");
    }

    await this.validateConcept(entry.concept, entry.ownerId);

    await this.entryRepository.save(entry);
    return entry;
  }
}