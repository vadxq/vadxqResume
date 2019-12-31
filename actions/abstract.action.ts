interface Input {
  name: string;
  value: boolean | string;
}
export abstract class AbstractAction {
  public abstract async handle(
    inputs?: Input[],
    options?: Input[]
  ): Promise<void>;
}