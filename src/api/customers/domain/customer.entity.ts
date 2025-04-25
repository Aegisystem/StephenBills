import { PersonType } from '../../shared/domain/person-type.enum';
import { DocumentType } from '../../shared/domain/document-type.enum';

export class Customer {
  readonly id: number;
  readonly documentId: string;
  documentType: DocumentType;
  verificationDigit: number;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  email: string;
  phone?: string;
  address?: {
    city: string;
    department: string;
    country: string;
    address: string;
  };
  personType: PersonType;
  userOwnerId?: string;
  isConsortium: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Constructor
  constructor(props: Partial<Customer>) {
    Object.assign(this, props);
  }

  // Métodos de negocio
  getFullName(): string {
    if (this.companyName) {
      return this.companyName;
    }
    return `${this.firstName || ''} ${this.lastName || ''}`.trim();
  }

  getFullAddress(): string {
    if (!this.address) return '';
    const { address, city, department, country } = this.address;
    return `${address || ''}, ${city || ''}, ${department || ''}, ${country || ''}`.trim();
  }

  getDocumentInfo(): string {
    return `${this.documentType} ${this.documentId}-${this.verificationDigit}`;
  }

  getIsConsortium(): boolean {
    return this.isConsortium
  }

  updateAddress(address: Customer['address']): void {
    this.address = address;
    this.updatedAt = new Date();
  }

  updateContactInfo(email?: string, phone?: string): void {
    if (email) this.email = email;
    if (phone) this.phone = phone;
    this.updatedAt = new Date();
  }
}