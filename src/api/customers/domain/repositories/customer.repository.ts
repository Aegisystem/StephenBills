import { Customer } from "../entities/customer.entity";

export abstract class CustomerRepository {
  abstract save(customer: Customer): Promise<void>;
  abstract findAll(): Promise<[Customer]>
  abstract findById(id: string): Promise<Customer | null>;
  abstract findByEmail(email: string): Promise<Customer | null>;
  abstract delete(id: string): Promise<void>;
}