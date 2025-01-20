const fs = require('fs');
const path = require('path');
const { mkdir } = require('fs/promises');
const stream = fs.createReadStream('06-build-page/template.html', 'utf8');

let componentsPath = path.join(__dirname, 'components');
let mainDirPath = path.join(__dirname, 'assets');
let copyDirPath = path.join(__dirname, 'project-dist/assets');

const option = {
  withFileTypes: true
}

// copy assets

mkdir('06-build-page/project-dist', {recursive: true});

fs.rm(copyDirPath, {recursive: true, force: true }, (err) => {
  if (!err) {
    copyDir();
  }
});

function copyDir() {
  mkdir('06-build-page/project-dist/assets', {recursive: true});
  fs.readdir(mainDirPath, option, (err, mainFiles) => {
    if (err) console.log(err);
      for (let mainFile of mainFiles) {
        if (!mainFile.isFile()) {
          let twoCopyDirPath = `${copyDirPath}\\${mainFile.name}`;
          let twoMainDirPath = `${mainFile.path}\\${mainFile.name}`;
          mkdir(twoCopyDirPath, {recursive: true});
          fs.readdir(twoMainDirPath, option, (err, files) => {
            if (err) console.log(err);
              for (let file of files) {
                let filePath = `${file.path}\\${file.name}`;
                let copyFilePath = `${twoCopyDirPath}\\${file.name}`;
                fs.copyFile(filePath, copyFilePath, (err) => {
                  if (err) console.log(`Файл ${file.name} не скопирован`);
                });
              }
          });
        } else {
          let mainFilePath = `${mainFile.path}\\${mainFile.name}`;
          let copyFilePath = `${copyDirPath}\\${mainFile.name}`;
          fs.copyFile(mainFilePath, copyFilePath, (err) => {
            if (err) console.log(`Файл ${mainFile.name} не скопирован`);
          });
        }
      }
  });
}

// copy styles

let stylesDirPath = path.join(__dirname, 'styles');

let arrayOfAllContent = [];

fs.unlink('06-build-page/project-dist/style.css', (err) => {
  if (err) {
    arrayEntryStyles();
  } else {
    arrayEntryStyles();
  }
});

function arrayEntryStyles() {
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
              writeArrayToStyleFile();
            }
          });
        }
      }
  });
}

function writeArrayToStyleFile() {
  fs.open('06-build-page/project-dist/style.css', 'w', (err) => {
    if (err) console.log('ошибка создания файла "style.css"');
    fs.writeFile('06-build-page/project-dist/style.css', arrayOfAllContent.join('\n'), (err) => {
      if (err) console.log('ошибка записи в файл!');
    });
  });
}

// HTML file entry

let result = '';
let baseName = [];

function nameComponents() {
  fs.readdir(componentsPath, option, (err, files) => {
    if (err) console.log(err);
      for (let file of files) {
        let pathFile = `${file.path}\\${file.name}`;
        baseName.push(path.basename(pathFile, '.html'));
      }
      readMainHTMLFile();
      tagReplacement();
  });
}

function tagReplacement() {
  for (let name of baseName) {
    let n = `{{${name}}}`;
    fs.readdir(componentsPath, option, (err, htmlFiles) => {
      if (err) console.log('ошибка чтения папки "components"');
      for (let htmlFile of htmlFiles) {
        let pathHTMLFile = `${htmlFile.path}\\${htmlFile.name}`;
        if (name === path.basename(htmlFile.name, '.html')) {
          fs.readFile(pathHTMLFile, (err, content) => {
            if (err) console.log(`ошибка чтения файла ${htmlFile.name}`);
              result = result.replace(n, content);
              writeArrayToHTMLFile();
          });
        }
      }
    });
  }
}

function readMainHTMLFile() {
  stream.on('data', (chunk) => {
    result = chunk;
  });
}

function writeArrayToHTMLFile() {
  fs.open('06-build-page/project-dist/index.html', 'w', (err) => {
    if (err) console.log('ошибка создания файла "index.html"');
    fs.writeFile('06-build-page/project-dist/index.html', result, (err) => {
      if (err) console.log('ошибка записи в "index.html"!');
    });
  });
}

nameComponents();























