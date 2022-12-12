import path from 'path';
import { state } from './index.js';

const commands = {
  'up': () => { 
    state.cwd = path.resolve(state.cwd, '..');
  }, 
}

export default (command) => {
  const { commandName, args = [] } = command; 
  return commands[commandName](...args);
}
