/* eslint-disable no-console */
const process = require('process');

const development = 'development';
const envMode = process.env.NODE_ENV || development;
const path = `./config/env/${envMode}.env`;
const dotenv = require('dotenv');
const ngrok = require('ngrok');
const fs = require('fs');
const os = require('os');

const readEnvVars = () => fs.readFileSync(path, 'utf-8').split(os.EOL);

dotenv.config({ path });

function getUrlAPI(urlDomain) {
  console.log(urlDomain);
  return `${urlDomain}/api/v${process.env.API_NU_VERSION}`;
}

/**
 * Updates value for existing key or creates a new key=value line
 *
 * This function is a modified version of https://stackoverflow.com/a/65001580/3153583
 *
 * @param {string} key Key to update/insert
 * @param {string} value Value to update/insert
 */
function setEnvValue(key, value) {
  const envVars = readEnvVars();
  const targetLine = envVars.find((line) => line.split('=')[0] === key);
  if (targetLine !== undefined) {
    // update existing line
    const targetLineIndex = envVars.indexOf(targetLine);
    // replace the key/value with the new value
    envVars.splice(targetLineIndex, 1, `${key}='${value}'`);
  } else {
    // create new key value
    envVars.push(`${key}='${value}'`);
  }
  // write everything back to the file system
  fs.writeFileSync(path, envVars.join(os.EOL));
}

async function loadExternalURI() {
  const serverPort = +process.env.SERVER_PORT || 30000;
  const urlDefault = `http://localhost:${serverPort}`;
  const ngrokToken = +process.env.NGROK_TOKEN;

  if (envMode === development || ngrokToken === undefined) {
    setEnvValue('URL_DOMAIN', urlDefault);
    console.error('Falha NGROK não será carregado!');
    return;
  }

  let url = await ngrok.connect({
    addr: serverPort,
    region: 'sa',
    authtoken: ngrokToken,
  });

  url = url === undefined ? urlDefault : url;

  setEnvValue('URL_DOMAIN', url);
  console.log(`Link gerado: ${getUrlAPI(url)}`);
}

loadExternalURI();
