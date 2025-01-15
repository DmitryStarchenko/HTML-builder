const fs = require('fs');
const path = require('path');

let pathFile = path.join(__dirname, "text.txt");
const file = fs.createReadStream(pathFile, 'utf-8');

let result = '';
file.on('data', (text) => {
  result += text;
});
file.on('end', () => {
  console.log(result);
});