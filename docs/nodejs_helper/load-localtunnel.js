/* eslint-disable no-process-exit */
/* eslint-disable no-console */
const localtunnel = require('localtunnel');
const helper = require('./helpers');
require('dotenv').config();

(async () => {

  const tunnel = await localtunnel(
    { port: process.env.SERVER_PORT, subdomain: process.env.URL_SUBDOMAIN },
  );

  helper.setEnvValue('URL_DOMAIN', tunnel.url);
  console.log(`Link gerado: ${helper.getUrlAPI()}`);

  tunnel.on('close', () => {

    console.error('Error: localtunnel stoped!');
    return process.exit(1);

  });

})();