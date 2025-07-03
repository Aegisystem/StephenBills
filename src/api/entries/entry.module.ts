import { Module } from "@nestjs/common";
import { EntryController } from "./controllers/entry.controller";
import { CreateEntryUseCase } from "./use-cases/create-entry.use-case";
import { EntryRepositoryImpl } from "./infraestructure/entry.repository.impl";
import { EntryRepository } from "./domain/repositories/entry.repository";
import { ConceptModule } from "../concepts/concept.module";

@Module({
  controllers: [EntryController],
  providers: [
    CreateEntryUseCase,
    {
      provide: EntryRepository,
      useClass: EntryRepositoryImpl
    }
  ],
  exports: [EntryRepository],
  imports: [ConceptModule]
})

export class EntryModule{}