import { Inject, Injectable } from "@nestjs/common";
import { ConceptRepository } from "../domain/repositories/concept.repository";
import { Concept } from "../domain/entities/concept.entity";
import { DB } from '../../../config/db.provider';
import { Insertable, Kysely } from "kysely";

interface Database {
  concepts: Concept;
}

@Injectable()
export class ConceptRepositoryImpl implements ConceptRepository{
  constructor(
    @Inject(DB)
    private readonly db: Kysely<Database>,
  ) {}
  async save(concept: Concept): Promise<void> {
    const { id, ...row } = concept;

    if (concept.id) {
      await this.db
        .updateTable('concepts')
        .set(row)
        .where('id', '=', id)
        .execute();
    } else {
      await this.db
        .insertInto('concepts')
        .values(row as Insertable<Concept>)
        .execute();
    }
  }

  async findById(id: bigint): Promise<Concept | null> {
    const row = await this.db
      .selectFrom('concepts')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    return row ? row : null;
  }
  
  async findAllByOwnerId(ownerId: string): Promise<Concept[]> {
    //TODO Check, it's maybe not needed
    return await this.db
      .selectFrom('concepts')
      .selectAll()
      .where('ownerId', '=', ownerId)
      .execute();
  }

  async findByKeyAndDocId(key: string, ownerId: string): Promise<Concept | null> {
    const row = await this.db
      .selectFrom('concepts')
      .selectAll()
      .where('ownerId', '=', ownerId)
      .where('key', '=', key)
      .executeTakeFirst();

    return row ? row : null;
  }

  async findAllByKeyAndDocId(key: string, ownerId: string): Promise<Concept[]> {
    const rows = await this.db
      .selectFrom('concepts')
      .selectAll()
      .where('ownerId', '=', ownerId)
      .where((eb) =>
        eb.or([
          eb('key', '=', key),
          eb('key', 'like', `${key}.%`)
        ])
      )
      .execute();

      console.log("Rows found:", rows.length, rows);

    return rows;
  }

  async delete(ownerId: string, id: bigint): Promise<void> {
    await this.db
      .deleteFrom('concepts')
      .where('ownerId', '=', ownerId)
      .where('id', '=', id)
      .execute();
  }
}