import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'process';
import * as url from 'url';
import { parseArgs } from './parseArgs.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const { username } = parseArgs(process.argv);

const runApp = () => {
  const greeting = `Welcome to the File Manager, ${username}!`;
  const goodbye = `Thank you for using File Manager, ${username}, goodbye!`
  const cwdMessage = `You are currently in ${__dirname}`;
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
    }
    console.log(cwdMessage);
  });
};

runApp();