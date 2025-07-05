import { Injectable, NotFoundException } from "@nestjs/common";
import { ConceptRepository } from "../domain/repositories/concept.repository";


@Injectable()
export class DeleteConceptUseCase {
  constructor(private readonly conceptRepository: ConceptRepository) {}

  async execute(ownerId: string, id: bigint): Promise<void> {
    const concept = await this.conceptRepository.findById(id);

    if (!concept) {
      throw new NotFoundException("Concept not found");
    }

    await this.conceptRepository.delete(ownerId, id);
  }
}