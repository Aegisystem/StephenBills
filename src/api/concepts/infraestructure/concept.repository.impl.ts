import { Inject, Injectable } from "@nestjs/common";
import { ConceptRepository } from "../domain/repositories/concept.repository";
import { Concept } from "../domain/entities/concept.entity";
import { DB } from '../../../config/db.provider';
import { Kysely } from "kysely";

interface Database {
  concept: Concept;
}

@Injectable()
export class ConceptRepositoryImpl implements ConceptRepository{
  constructor(
    @Inject(DB)
    private readonly db: Kysely<Database>,
  ) {}
  async save(concept: Concept): Promise<void> {

  }
  
  async findAllByOwnerId(ownerId: string): Promise<Concept[]> {
    return await this.db
      .selectFrom('concept')
      .selectAll()
      .where('ownerId', '=', ownerId)
      .execute();
  }

  async findByKeyAndDocId(key: string, ownerId: string): Promise<Concept[]> {
    const rows = await this.db
      .selectFrom('concept')
      .selectAll()
      .where('ownerId', '=', ownerId)
      .where((eb) =>
        eb.or([
          eb('key', '=', key),
          eb('key', 'like', `${key}.%`)
        ])
      )
      .execute();

    return rows;
}

  async delete(ownerId: string, id: bigint): Promise<void> {
    await this.db
      .deleteFrom('concept')
      .where('ownerId', '=', ownerId)
      .where('id', '=', id)
      .execute();
  }
}