export class Entry {
  public readonly id: bigint;
  public readonly cufe: string;
  public ownerId: string;
  public thirdPartyId?: string;
  public concept: string;
  public debit: number;
  public credit: number;
  public issueDate: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: Partial<Entry>) {
    Object.assign(this, props);
  }
}