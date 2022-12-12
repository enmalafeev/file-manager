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

const runApp = () => {
  console.log(greeting);
  console.log(`You are currently in ${state.cwd}`);
  const rl = readline.createInterface({ input, output });
  rl.on('SIGINT', () => {
    console.log(goodbye);
    rl.close();
  });
  rl.on('line', (input) => {
    if (input === '.exit') {
      console.log(goodbye);
      rl.close(); 
    } else {
      const command = parseCommands(input);
      runCommand(command);
      console.log(`You are currently in ${state.cwd}`);
    }
  });
};

runApp();