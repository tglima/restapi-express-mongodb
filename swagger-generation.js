/* eslint-disable no-console */
/* eslint-disable security/detect-non-literal-fs-filename */

const fs = require('fs');
const jsonTemplate = './docs/swagger/swagger_template.json';
const fileFinal = './swagger.json';
const appConfig = require('./app/config/app.config');
const urlAPI = `${appConfig.urlPathSwagger}${appConfig.urlBaseApi}`;

const removeOldFile = (file) => {

  fs.unlink(file, (error) => {

    if (error) {

      console.warn(
        `Problemas ao remover o arquivo: ${fileFinal}`,
      );

    }

  });

};

const updateJSON = (file) => {

  const result = { wasSuccess: true, message: undefined, error: undefined };
  let data;

  try {

    data = fs.readFileSync(
      file,
      { encoding: 'utf8', flag: 'r' },
    );

  } catch (error) {

    data = undefined;
    result.message = 'Erro ao tentar ler o arquivo template.';
    result.wasSuccess = false;
    result.error = error;
    return result;

  }

  const json = JSON.parse(data);

  try {

    json.servers[0].url = urlAPI;

  } catch (error) {

    result.message = 'Erro ao tentar atualizar a propriedade servers.';
    result.wasSuccess = false;
    result.error = error;

  }

  fs.writeFileSync(fileFinal, JSON.stringify(json, null, 3), (error) => {

    if (error) {

      result.message = 'Erro ao tentar atualizar a propriedade servers.';
      result.wasSuccess = false;
      result.error = error;

    }

  });

  return result;

};

const generateSwaggerFile = () => {

  removeOldFile(fileFinal);

  const result = updateJSON(jsonTemplate);

  if (!result.wasSuccess && result.error) {

    throw result.error;

  }

};

generateSwaggerFile();