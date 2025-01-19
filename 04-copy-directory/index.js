const fs = require('fs');
const { mkdir } = require('fs/promises');
const path = require('path');

let mainDirPath = path.join(__dirname, 'files');
let copyDirPath = path.join(__dirname, 'files-copy');

const option = {
  withFileTypes: true
}

fs.rm(copyDirPath, {recursive: true, force: true }, (err) => {
  if (!err) {
    copyDir();
  }
});

function copyDir() {
  mkdir('04-copy-directory/files-copy', {recursive: true});
  fs.readdir(mainDirPath, option, (err, mainFiles) => {
    if (err) console.log(err);
      for (let mainFile of mainFiles) {
        let mainFilePath = `${mainFile.path}\\${mainFile.name}`;
        let copyFIlePath = `${copyDirPath}\\${mainFile.name}`;
        fs.copyFile(mainFilePath, copyFIlePath, (err) => {
          if (err) {
            console.log(`Файл ${mainFile.name} не скопирован`);
          } else {
            console.log(`Файл ${mainFile.name} скопирован`);
          }
        });
      }
  });
}


