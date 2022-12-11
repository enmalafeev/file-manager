import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'process';
import { homedir } from 'os';
import { parseArgs } from './parseArgs.js';
import parseCommands from './parseCommands.js';


const { username } = parseArgs(process.argv);

const runApp = () => {
  const greeting = `Welcome to the File Manager, ${username}!`;
  const goodbye = `Thank you for using File Manager, ${username}, goodbye!`
  process.chdir(homedir());
  const cwd = process.cwd();
  const cwdMessage = `You are currently in ${cwd}`;
  console.log(greeting);
  console.log(cwdMessage);
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
      parseCommands(input);
      console.log(cwdMessage);
    }
  });
};

runApp();