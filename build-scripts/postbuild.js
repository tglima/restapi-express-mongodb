const fs = require('fs');
const path = require('path');

const appRootDir = process.cwd();
const isWindows = appRootDir.includes('\\');
const separator = isWindows ? '\\' : '/';
const packageJsonPath = path.join(appRootDir, separator, 'package.json');
const packageLockJsonPath = path.join(appRootDir, separator, 'package-lock.json');
const dockerfilePath = path.join(appRootDir, separator, 'Dockerfile');
const distDirPath = path.join(appRootDir, separator, 'dist');

const getFilenameFromPath = (filePath) => {
  return filePath.split(separator).pop();
};

const checkFileExists = (filePath) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`"${getFilenameFromPath(filePath)}" não foi encontrado!`);
  }
};

const copyFileSync = (sourceFile) => {
  try {
    const destFile = path.join(distDirPath, getFilenameFromPath(sourceFile));
    fs.copyFileSync(sourceFile, destFile);
    console.log(`${getFilenameFromPath(sourceFile)} copiado com sucesso`);
  } catch (error) {
    throw new Error(` Erro ao tentar copiar"${getFilenameFromPath(sourceFile)}"!`);
  }
};

const prepareFiles = () => {
  const filesPath = [dockerfilePath, packageJsonPath, packageLockJsonPath, distDirPath];
  filesPath.forEach((filePath) => {
    checkFileExists(filePath);
    if (filePath != distDirPath) {
      copyFileSync(filePath);
    }
  });

  console.log('\nPostbuild completado com sucesso!');
};

prepareFiles();
