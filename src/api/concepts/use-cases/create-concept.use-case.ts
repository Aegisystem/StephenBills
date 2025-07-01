import { Injectable } from "@nestjs/common";
import { ConceptRepository } from "../domain/repositories/concept.repository";
import { CreateConceptDto } from "../dto/create-concept.dto";
import { Concept } from "../domain/entities/concept.entity";

@Injectable()
export class CreateConceptUseCase {
  constructor(
    private readonly conceptRepository: ConceptRepository,
  ) {}

  async execute(dto: CreateConceptDto): Promise<Concept> {
    //TODO: Validate the concept of the entry
    const entry = new Concept(dto)
    await this.conceptRepository.save(entry);
    return entry;
  }
}