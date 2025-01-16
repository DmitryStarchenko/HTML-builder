const fs = require('fs');
const path = require('path');

const option = {
  withFileTypes: true
}
let dirPath

let result = function() {
  dirPath = path.join(__dirname, "secret-folder");
  fs.readdir(dirPath, option,  (err, files) => {
    if (err) console.log(err);
    for (let file of files) {
      if (file.isFile()) {
        let pathFile = `${file.path}\\${file.name}`;
        let statsFile = fs.statSync(pathFile);
        let extension = path.extname(pathFile);
        let baseName = path.basename(pathFile).replace(extension, '');
        console.log(`${baseName} - ${extension.slice(1)} - ${statsFile.size}b`);
      } else {
        dirPath = `${dirPath}\\${file.name}`;
        fs.readdir(dirPath, option,  (err, files) => {
          if (err) console.log(err);
          for (let file of files) {
            if (file.isFile()) {
              let pathFile = `${file.path}\\${file.name}`;
              let extension = path.extname(pathFile);
              let statsFile = fs.statSync(pathFile);
              let baseName = path.basename(pathFile).replace(extension, '');
              console.log(`${baseName} - ${extension.slice(1)} - ${statsFile.size}b`);
            }
          }
        });
      }
    }
  });
}

result();




