import { IsString, IsEmail, IsOptional, IsEnum, IsBoolean, IsNumber, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { PersonType } from '../../shared/domain/person-type.enum';
import { DocumentType } from '../../shared/domain/document-type.enum';

class AddressDto {
  @IsString()
  city: string;

  @IsString()
  department: string;

  @IsString()
  country: string;

  @IsString()
  address: string;
}

export class CreateCustomerDto {
  @IsString()
  documentId: string;

  @IsEnum(DocumentType)
  documentType: DocumentType;

  @IsNumber()
  verificationDigit: number;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @ValidateNested()
  @Type(() => AddressDto)
  @IsOptional()
  address?: AddressDto;

  @IsEnum(PersonType)
  personType: PersonType;

  @IsString()
  @IsOptional()
  userOwnerId?: string;

  @IsBoolean()
  @IsOptional()
  isConsortium?: boolean;
} 