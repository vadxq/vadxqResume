import { Command, CommanderStatic } from 'commander';
import { AbstractCommand } from './abstract.command';

export class InitCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command('init [tpl] [path]')
      .alias('i')
      .description('Init Files From Git, example: tpl init demo src')
      .action(async (tpl: string, path: string) => {
        let inputs: any = { path, tpl};
        await this.action.handle(inputs);
      });
  }
}