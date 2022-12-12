import path from 'path';
import os from 'os';
import { state } from './index.js';

const commands = {
  'up': () => { 
    state.cwd = path.resolve(state.cwd, '..');
  },
  'os': (arg) => {
    if (arg === '--EOL') {
      console.log(JSON.stringify(os.EOL));
    }
  }
}

export default (command) => {
  const { commandName, args = [] } = command; 
  return commands[commandName](...args);
}
