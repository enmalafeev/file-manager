import { argv } from 'node:process';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'process';

const getUserName = (args) => {
  const firstArg = args[0];
  return firstArg.split('=')[1];
};

const runApp = () => {
  const args = argv.slice(2);
  const userName = getUserName(args);
  const greeting = `Welcome to the File Manager, ${userName}!`;
  const goodbye = `Thank you for using File Manager, ${userName}, goodbye!`
  console.log(greeting);
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
  });
};

runApp();