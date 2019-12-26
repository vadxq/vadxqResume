import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import * as inquirer from 'inquirer'

export class GoodByeCommand extends Command {
  static args = [
    {name: 'firstArg'},
    {name: 'secondArg'},
    {
      name: 'file',               // name of arg to show in help and reference with args[name]
      required: false,            // make the arg required with `required: true`
      description: 'output file', // help description
      hidden: true,               // hide this arg from help
      parse: input => 'output',   // instead of the user input, return a different value
      default: 'world',           // default value if no arg input
      options: ['a', 'b'],
    },
  ]

  static flags = {
    stage: flags.string({options: ['development', 'staging', 'production']})
  }

  async run() {
    this.log('goodbye')
    this.warn('uh oh!')
    const {args} = this.parse(GoodByeCommand)
    this.log(`running my command with args: ${args.firstArg}, ${args.secondArg}`)
    // can also get the args as an array
    const {argv} = this.parse(GoodByeCommand)
    this.log(`running my command with args: ${argv[0]}, ${argv[1]}`)
    // just prompt for input
    const name = await cli.prompt('What is your name?')

    // mask input after enter is pressed
    const secondFactor = await cli.prompt('What is your two-factor token?', {type: 'mask'})

    // hide input while typing
    const password = await cli.prompt('What is your password?', {type: 'hide'})

    this.log(`You entered: ${name}, ${secondFactor}, ${password}`)

    const {flags} = this.parse(GoodByeCommand)
    let stage = flags.stage
    if (!stage) {
      const responses: any = await inquirer.prompt([{
        name: 'stage',
        message: 'select a stage',
        type: 'list',
        choices: [{name: 'development'}, {name: 'staging'}, {name: 'production'}],
      }])
      stage = responses.stage
    }
    this.log(`the stage is: ${stage}`)
  }
}
