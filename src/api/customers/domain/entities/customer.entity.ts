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

  // Constructor
  constructor(props: Partial<Customer>) {
    Object.assign(this, props);
  }

  public updateAddress(address: Customer['address']): void {
    this.address = address;
    this.updatedAt = new Date();
  }

  public updateContactInfo(email?: string, phone?: string): void {
    if (email) this.email = email;
    if (phone) this.phone = phone;
    this.updatedAt = new Date();
  }
}