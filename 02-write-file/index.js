const fs = require('fs');
const readline = require('node:readline');
const path = require('path');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });
const file = fs.createWriteStream(path.resolve(__dirname, 'text.txt'));

output.write('Enter text:\n');

rl.on('line', (input) => {
  if (input === 'exit' || input === 'Exit') {
    rl.close();
    output.write('Entry completed');
  }
  file.write(input);
});

rl.on('SIGINT', () => {
  rl.close();
  output.write('Entry completed');
});










