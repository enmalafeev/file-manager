export default (input) => {
  const commands = input.split(' ');
  const result = {};
  result.commandName = commands[0];
  result.args = commands.slice(1);
  return result;
}