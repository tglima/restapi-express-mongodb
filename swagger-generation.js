/* eslint-disable no-console */

const development = 'development';
const envMode = process.env.NODE_ENV || development;
const path = `./config/env/${envMode}.env`;
const jsonTemplate = './docs/swagger/swagger_template.json';
const fileFinal = './swagger.json';
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config({ path });

function getUrlAPI() {
  const urlDomain = `${process.env.URL_DOMAIN}`;
  const urlBaseApi = `/api/v${process.env.API_NU_VERSION}`;
  return `${urlDomain}${urlBaseApi}`.replaceAll('"', '').replaceAll("'", '');
}

function removeOldFile(file) {
  const msgError = `Erro ao remover o arquivo: ${fileFinal}`;
  try {
    if (fs.existsSync(file)) {
      fs.unlink(file, (error) => {
        if (error) {
          console.error(msgError);
        }
      });
    }
  } catch (error) {
    console.warn(msgError);
  }
}

function updateJSON(file) {
  const result = { wasSuccess: true, message: undefined, error: undefined };
  const errorUpdPropServer = 'Erro ao tentar atualizar a propriedade servers.';
  const errorReadFile = 'Erro ao tentar ler o arquivo template.';
  let data;

  try {
    data = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
  } catch (error) {
    data = undefined;
    result.message = errorReadFile;
    result.wasSuccess = false;
    result.error = error;
    return result;
  }

  if (data === undefined) {
    result.message = errorReadFile;
    result.wasSuccess = false;
    return result;
  }

  const json = JSON.parse(data);

  try {
    json.servers[0].url = getUrlAPI();
  } catch (error) {
    result.message = errorUpdPropServer;
    result.wasSuccess = false;
    result.error = error;
  }

  fs.writeFileSync(fileFinal, JSON.stringify(json, null, 3), (error) => {
    if (error) {
      result.message = errorUpdPropServer;
      result.wasSuccess = false;
      result.error = error;
    }
  });

  return result;
}

function generateSwaggerFile() {
  removeOldFile(fileFinal);

  const result = updateJSON(jsonTemplate);

  if (!result.wasSuccess && result.error) {
    throw result.error;
  }
}

generateSwaggerFile();
