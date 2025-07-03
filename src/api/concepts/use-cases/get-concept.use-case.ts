import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Concept } from "../domain/entities/concept.entity";
import { ConceptRepository } from "../domain/repositories/concept.repository";


@Injectable()
export class GetConceptsUseCase {
  constructor(private readonly conceptRepository: ConceptRepository) {}

  async getById(id: bigint): Promise<Concept> {
    const concept = await this.conceptRepository.findById(id);

    if (!concept) {
      throw new NotFoundException("Concept not found");
    }

    return concept;
  }

  async getAllByOwnerId(ownerId: string): Promise<Concept[]> {
    const concepts = await this.conceptRepository.findAllByOwnerId(ownerId)

    if (!concepts) {
      throw new NotFoundException("Concept not found");
    }

    return concepts;
  }

  async getAllByKeyAndDocId(key: string, ownerId: string): Promise<Concept[]> {
    const concepts = await this.conceptRepository.findAllByKeyAndDocId(key, ownerId)

    if (!concepts || concepts.length === 0) {
      throw new NotFoundException("Concepts not found");
    }

    return concepts;
  }
}