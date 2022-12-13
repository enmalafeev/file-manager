import path from 'path';
import os from 'os';
import { writeFile } from 'fs/promises';
import { state } from './index.js';
import { createReadStream } from 'fs';

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
  },
  'cat': (pathToFile) => {
    return createReadStream(pathToFile).pipe(process.stdout);
  },
  'add': async (fileName) => 
    await writeFile(`${state.cwd}/${fileName}`, '', { flag: 'ax' }),
  
}

export default (command) => {
  const { commandName, args = [] } = command; 
  return commands[commandName](...args);
}
