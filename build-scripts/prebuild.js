const fs = require('fs');
const path = require('path');
const appRootDir = process.cwd();
const isWindows = appRootDir.includes('\\');
const separator = isWindows ? '\\' : '/';

const distDirPath = path.join(appRootDir, separator, 'dist');

const deleteFolder = (folder) => {
  if (fs.existsSync(folder)) {
    fs.readdirSync(folder).forEach((file) => {
      const pathFile = path.join(folder, file);

      if (fs.lstatSync(pathFile).isDirectory()) {
        deleteFolder(pathFile);
      } else {
        fs.unlinkSync(pathFile);
      }
    });

    fs.rmdirSync(folder);
  }
};

const prepareFolder = () => {
  deleteFolder(distDirPath);
  console.log(`Pasta "${distDirPath}" e seus arquvos foram excluídos com sucesso`);
};

prepareFolder();
