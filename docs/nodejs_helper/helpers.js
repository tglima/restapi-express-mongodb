const fs = require('fs');
const path = require('path');
require('dotenv').config();
const process = require('process');
const os = require('os');
const pathEnv = path.join(__dirname, '../../');
const envFilePath = path.resolve(pathEnv, '.env');
const readEnvVars = () => fs.readFileSync(envFilePath, 'utf-8').split(os.EOL);
const appConfig = require('../../app/config/app.config');

/**
 * Finds the key in .env files and returns the corresponding value
 *
 * @param {string} key Key to find
 * @returns {string|null} Value of the key
 */
exports.getEnvValue = (key) => {

  // find the line that contains the key (exact match)
  const matchedLine = readEnvVars().find((line) => line.split('=')[0] === key);
  // split the line (delimiter is '=') and return the item at index 2
  return matchedLine !== undefined ? matchedLine.split('=')[1] : null;

};

/**
 * Updates value for existing key or creates a new key=value line
 *
 * This function is a modified version of https://stackoverflow.com/a/65001580/3153583
 *
 * @param {string} key Key to update/insert
 * @param {string} value Value to update/insert
 */
exports.setEnvValue = (key, value) => {

  const envVars = readEnvVars();
  const targetLine = envVars.find((line) => line.split('=')[0] === key);
  if (targetLine !== undefined) {

    // update existing line
    const targetLineIndex = envVars.indexOf(targetLine);
    // replace the key/value with the new value
    envVars.splice(targetLineIndex, 1, `${key}="${value}"`);

  } else {

    // create new key value
    envVars.push(`${key}="${value}"`);

  }
  // write everything back to the file system
  fs.writeFileSync(envFilePath, envVars.join(os.EOL));

};

exports.getUrlAPI = () => {

  let urlDomain;

  try {

    urlDomain = this.getEnvValue('URL_DOMAIN');

  } catch (err) {

    urlDomain = undefined;

  }

  if (urlDomain === undefined) {

    urlDomain = `${process.env.URL_DOMAIN}`;

  }

  return `${urlDomain}${appConfig.urlBaseApi}`
    .replaceAll('"', '').replaceAll('\'', '');

};

exports.getUrlSwagger = () => {

  let urlDomain;

  try {

    urlDomain = this.getEnvValue('URL_DOMAIN');

  } catch (err) {

    urlDomain = undefined;

  }

  if (urlDomain === undefined) {

    urlDomain = `${process.env.URL_DOMAIN}`;

  }

  return `${urlDomain}${process.env.PATH_SWAGGER}`
    .replaceAll('"', '').replaceAll('\'', '');

};