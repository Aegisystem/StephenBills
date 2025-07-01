export class Concept {
  public readonly id: bigint;
  public ownerId: string;
  public key: string;
  public naturalBehavior: string;
  public editable: boolean;

  constructor(props: Partial<Concept>) {
    Object.assign(this, props);
  }
}