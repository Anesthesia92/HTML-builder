const path = require('path');
const fs = require('fs');
const readline = require('readline');
const linkFile = path.join(__dirname, 'text.txt');
const file = fs.createWriteStream(linkFile);
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });

output.write('Please write your text: \n');

rl.on('line', input => {
  const closeProcess = input.trim().toLowerCase();
  if (closeProcess === 'exit') {
    process.exit();
  }
  else {
    file.write(input + '\n');
  }
});

process.on('exit', () => output.write('Good buy'));