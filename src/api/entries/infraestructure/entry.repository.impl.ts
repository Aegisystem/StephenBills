import { Inject, Injectable } from "@nestjs/common";
import { Entry } from "../domain/entities/entry.entity";
import { DB } from "src/config/db.provider";
import { Insertable, Kysely } from "kysely";


interface Database {
  entries: Entry;
}

@Injectable()
export class EntryRepositoryImpl {
  constructor(
    @Inject(DB)
    private readonly db: Kysely<Database>,
  ) {}

  async save(entry: Entry): Promise<void> {
    const { id, createdAt, updatedAt, ...row } = entry;

    if (entry.id) {
      await this.db
        .updateTable('entries')
        .set(row)
        .where('id', '=', entry.id)
        .execute();
    } else {
      await this.db
        .insertInto('entries')
        .values(row as Insertable<Entry>)
        .execute();
    }
  }

  async findById(id: bigint): Promise<Entry | null> {
    const row = await this.db
      .selectFrom('entries')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    return row ? row : null;
  }
}