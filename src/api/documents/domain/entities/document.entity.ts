

export abstract class Document {
  public readonly id: bigint;
  public ownerId: string;
  public key: string;
  public naturalBehavior: string;
  public editable: boolean;

  constructor(props: Partial<Document>) {
    Object.assign(this, props);
  }
}