import { PersonType } from '../../../shared/domain/person-type.enum';
import { DocumentType } from '../../../shared/domain/document-type.enum';

export class Customer {
  public readonly id: number;
  public readonly documentId: string;
  public documentType: DocumentType;
  public verificationDigit: number;
  public firstName?: string;
  public lastName?: string;
  public companyName?: string;
  public email: string;
  public phone?: string;
  public address?: {
    city: string;
    department: string;
    country: string;
    address: string;
  };
  public personType: PersonType;
  public userOwnerId?: string;
  public isConsortium: boolean;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: Partial<Customer>) {
    Object.assign(this, props);
  }
}