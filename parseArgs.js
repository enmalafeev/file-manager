export const parseArgs = (args) => {
  return args.slice(2)
    .map((arg) => arg.split('='))
    .reduce((acc, [key, value]) => {
      if (key.startsWith('--')) {
        const newKey = key.replace('--', '');
        acc[newKey] = value;
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});
};