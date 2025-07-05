import { Concept } from "../entities/concept.entity";

export abstract class ConceptRepository {
  abstract save(concept: Concept): Promise<void>;
  abstract findById(id: BigInt): Promise<Concept | null>;
  abstract findByKeyAndDocId(key: string, ownerId: string): Promise<Concept | null>;
  abstract findAllByKeyAndDocId(key: string, ownerId: string): Promise<Concept[]>;
  abstract findAllByOwnerId(ownerId: string): Promise<Concept[]>;
  abstract delete(ownerId: string, id: BigInt): Promise<void>;
}