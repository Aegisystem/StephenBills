import { ConflictException, Injectable } from "@nestjs/common";
import { ConceptRepository } from "../domain/repositories/concept.repository";
import { CreateConceptDto } from "../dto/create-concept.dto";
import { Concept } from "../domain/entities/concept.entity";

@Injectable()
export class CreateConceptUseCase {
  constructor(
    private readonly conceptRepository: ConceptRepository,
  ) {}

  async execute(dto: CreateConceptDto): Promise<Concept> {
    const existing = await this.conceptRepository.findByKeyAndDocId(dto.key, dto.ownerId);

    if (existing) {
      throw new ConflictException("A concept with the same key and ownerId already exists.");
    }
   
    const existGlobalConcept = await this.conceptRepository.findByKeyAndDocId(dto.key, "")
    if (existGlobalConcept) {
      throw new ConflictException("There's an existing global concept with the same key.");
    }

    const entry = new Concept(dto);
    await this.conceptRepository.save(entry);
    return entry;
  }
}