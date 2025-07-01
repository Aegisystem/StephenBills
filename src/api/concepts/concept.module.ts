import { Module } from "@nestjs/common";
import { ConceptController } from "./controllers/concept.controller";
import { CreateConceptUseCase } from "./use-cases/create-concept.use-case";
import { ConceptRepository } from "./domain/repositories/concept.repository";
import { ConceptRepositoryImpl } from "./infraestructure/concept.repository.impl";


@Module({
  controllers: [ConceptController],
  providers: [
    CreateConceptUseCase,
    {
      provide: ConceptRepository,
      useClass: ConceptRepositoryImpl,
    },
  ],
  exports: [ConceptRepository],
})

export class ConceptModule {}