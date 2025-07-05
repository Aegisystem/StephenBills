import { Entry } from "../entities/entry.entity";

export abstract class EntryRepository {
  abstract save(customer: Entry): Promise<void>;
  abstract findAllByOwnerId(ownerId: string): Promise<Entry[]>
  abstract findById(id: bigint): Promise<Entry | null>;
  abstract findByConcept(concept: string): Promise<Entry[]>;
  abstract delete(id: BigInt): Promise<void>;
}