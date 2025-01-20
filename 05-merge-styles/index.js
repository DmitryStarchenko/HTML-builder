const { isUtf8 } = require('buffer');
const fs = require('fs');
const path = require('path');

let stylesDirPath = path.join(__dirname, 'styles');

const option = {
  withFileTypes: true
}

let arrayOfAllContent = [];

fs.unlink('05-merge-styles/project-dist/bundle.css', (err) => {
  if (err) {
    arrayEntry();
  } else {
    arrayEntry();
  }
});

function arrayEntry() {
  fs.readdir(stylesDirPath, option, (err, mainFiles) => {
    if (err) console.log('ошибка чтения папки "styles"');
      for (let mainFile of mainFiles) {
        let pathFile = `${mainFile.path}\\${mainFile.name}`;
        let extension = path.extname(pathFile);
        if (extension === '.css') {
          fs.readFile(pathFile, (err, content) => {
            if (err) {
              console.log(`ошибка чтения файла ${mainFile.name}`);
            } else {
              arrayOfAllContent.push(content);
              writeArrayToFile();
            }
          });
        }
      }
  });
}

function writeArrayToFile() {
  fs.open('05-merge-styles/project-dist/bundle.css', 'w', (err) => {
    if (err) console.log('ошибка создания файла "bundle.css"');
    fs.writeFile('05-merge-styles/project-dist/bundle.css', arrayOfAllContent.join('\n'), (err) => {
      if (err) console.log('ошибка записи в файл!');
    });
  });
}