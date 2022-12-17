import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'process';
import { homedir } from 'os';
import { parseArgs } from './parseArgs.js';
import runCommand from './runCommand.js';
import parseCommands from './parseCommands.js';
import State from './state.js';


const { username } = parseArgs(process.argv);
const greeting = `Welcome to the File Manager, ${username}!`;
const goodbye = `Thank you for using File Manager, ${username}, goodbye!`
process.chdir(homedir());
export const state = new State(process.cwd());
export const rl = readline.createInterface({ input, output, prompt: '> ' });

const runApp = () => {
  console.log(greeting);
  console.log(`You are currently in ${state.cwd}`);
  rl.prompt();
  
  rl.on('line', async (input) => {
    input = input.trim();
    const command = parseCommands(input);
    try {
      await runCommand(command);
      console.log(`You are currently in ${state.cwd}`);
    } catch (err) {
      console.error(err.message);
      rl.prompt();
    }
  }).on('close', () => {
    console.log(goodbye);
    process.exit(0);
  });
}

runApp();