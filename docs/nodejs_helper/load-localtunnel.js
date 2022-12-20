const localtunnel = require('localtunnel');
const helper = require('./helpers');
require('dotenv').config();

(async () => {

  const tunnel = await localtunnel({ port: process.env.SERVER_PORT });
  helper.setEnvValue('URL_DOMAIN', tunnel.url);
  console.log(`Link gerado: ${tunnel.url}`);
  tunnel.on('close', () => {
  });

})();