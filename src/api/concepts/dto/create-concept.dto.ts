import { IsEnum, IsString, Matches } from "class-validator";

export class CreateConceptDto {
  
  @IsString()
  ownerId: string;

  @IsString()
  @Matches(/^([a-z0-9]+)(\.[a-z0-9]+)*$/, {
    message: 'concept must follow the format nivel1.nivel2 (only lowercase letters and numbers, separated by dots)',
  })
  key: string;

  @IsString()
  @IsEnum(['credit', 'debit'], {message: 'naturalBehavior must be either "credit" or "debit"'})
  naturalBehavior: 'credit' | 'debit';

  @IsString()
  editable: boolean;
}