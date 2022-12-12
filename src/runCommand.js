import path from 'path';
import os from 'os';
import { state } from './index.js';

const commands = {
  'up': () => { 
    state.cwd = path.resolve(state.cwd, '..');
  },
  'os': (arg) => {
    switch (arg) {
      case '--EOL':
        console.log(JSON.stringify(os.EOL));
        break;
      case '--cpus':
        const cpus = os.cpus().map(({ model, speed }) => ({ model, speed }));
        console.log(JSON.stringify(cpus, null, 2));
        break;
      case '--homedir':
        console.log(os.homedir());
        break;
      case '--username':
        const userInfo = os.userInfo();
        const { username } = userInfo;
        console.log(username);
        break;
      case '--architecture':
        console.log(os.arch());
        break;
    }
    
  }
}

export default (command) => {
  const { commandName, args = [] } = command; 
  return commands[commandName](...args);
}
