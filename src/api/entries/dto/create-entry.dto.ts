import { IsDate, IsNumber, IsOptional, IsString, Matches, Min } from "class-validator";

export class CreateEntryDto {
  @IsString()
  cufe: string;

  @IsString()
  ownerId: string;

  @IsOptional()
  thirdPartyId?: string;

  @IsString()
  @Matches(/^([a-z0-9]+)(\.[a-z0-9]+)*$/, {
    message: 'concept must follow the format nivel1.nivel2 (only lowercase letters and numbers, separated by dots)',
  })
  concept: string;

  @IsNumber()
  @Min(0)
  debit: number;

  @IsNumber()
  @Min(0)
  credit: number;

  @IsDate()
  issueDate: Date;
}