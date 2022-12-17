import path from 'path';
import os from 'os';
import { writeFile, access, readdir, stat } from 'fs/promises';
import { rl, state } from './index.js';
import { createReadStream } from 'fs';

const commands = {
  '.exit': () => {
    rl.close();
  },
  'up': () => { 
    state.cwd = path.resolve(state.cwd, '..');
  },
  'cd': async (pathTo) => {
    try {
      const newPath = path.resolve(state.cwd, pathTo);
      await access(newPath);
      state.cwd = newPath;
    } catch (err) {
      throw new Error('Operation failed');
    }
  },
  'ls': async () => {
    const dirFiles = await readdir(state.cwd);
    const dirs = [];
    const files = [];
    for (let file of dirFiles) {
      const pathTo = path.resolve(state.cwd, file);
      const stats = await stat(pathTo);
      if (stats.isDirectory()) {
        dirs.push({ name: file, type: 'directory' });
      }
      if (stats.isFile()) {
        files.push({ name: file, type: 'file' }); 
      }
      if (stats.isSymbolicLink()) {
        continue;
      }
    };
    const sortedResult = [...dirs, ...files].sort((a, b) => a - b);
    console.table(sortedResult);
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
  if (commands[commandName]) {
    return commands[commandName](...args);
  } else {
    throw new Error('Invalid input');
  }
}
