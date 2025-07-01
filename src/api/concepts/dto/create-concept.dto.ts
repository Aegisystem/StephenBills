import { IsEnum, IsString } from "class-validator";

export class CreateConceptDto {
  
  @IsString()
  ownerId: string;

  @IsString()
  key: string;

  @IsString()
  @IsEnum(['credit', 'debit'], {message: 'naturalBehavior must be either "credit" or "debit"'})
  naturalBehavior: 'credit' | 'debit';

  @IsString()
  editable: boolean;
}