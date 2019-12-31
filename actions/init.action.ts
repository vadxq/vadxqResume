import { AbstractAction } from "./abstract.action";

export class InitAction extends AbstractAction {
  public async handle(inputs: any) {
    console.log(inputs.tpl);
    console.log(inputs.path);
  }
}