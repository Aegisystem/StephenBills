import { IsBoolean, IsEnum, IsString, Matches } from "class-validator";
import { NaturalBehavior } from "src/api/shared/domain/natural-behavior";

export class CreateConceptDto {
  
  @IsString()
  ownerId: string;

  @IsString()
  @Matches(/^([a-z0-9]+)(\.[a-z0-9]+)*$/, {
    message: 'concept must follow the format nivel1.nivel2 (only lowercase letters and numbers, separated by dots)',
  })
  key: string;

  @IsString()
  @IsEnum(NaturalBehavior, {message: 'naturalBehavior must be either "credit" or "debit"'})
  naturalBehavior: NaturalBehavior;

  @IsBoolean()
  editable: boolean = true;
}