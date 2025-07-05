import { Module } from "@nestjs/common";
import { ConceptController } from "./controllers/concept.controller";
import { CreateConceptUseCase } from "./use-cases/create-concept.use-case";
import { ConceptRepository } from "./domain/repositories/concept.repository";
import { ConceptRepositoryImpl } from "./infraestructure/concept.repository.impl";
import { DeleteConceptUseCase } from "./use-cases/delete-concept.use-case";
import { GetConceptsUseCase } from "./use-cases/get-concept.use-case";


@Module({
  controllers: [ConceptController],
  providers: [
    CreateConceptUseCase,
    DeleteConceptUseCase,
    GetConceptsUseCase,
    {
      provide: ConceptRepository,
      useClass: ConceptRepositoryImpl,
    },
  ],
  exports: [ConceptRepository],
})

export class ConceptModule {}