import { PersonType } from '../../../shared/domain/person-type.enum';

export class Entry {
  public readonly id: bigint;
  public readonly cufe: string;
  public owner_id: bigint;
  public third_party_id?: bigint;
  public concept: string;
  public debit: number;
  public issue_date?: string;
  public createdAt: Date;
  public updatedAt: Date;
}