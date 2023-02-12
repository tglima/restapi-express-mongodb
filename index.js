/* eslint-disable no-console */
/* eslint-disable node/no-unpublished-require */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const appConfig = require('./app/config/app.config');
const router = require('./app/routes/routes');
const swaggerFile = require('./swagger.json');
const helpers = require('./docs/nodejs_helper/helpers');
const messageSwaggerUp = `Swagger disponível em: ${helpers.getUrlSwagger()}\n`;

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 120,
  statusCode: 429,
  message: 'Limite de requisicoes ultrapassado, por favor, aguarde.',
});

app.use(express.json());
app.use(bodyParser.json());
app.use(helmet.ieNoOpen());
app.use(helmet.hidePoweredBy());
app.use('/', apiLimiter);

app.use(
  `${appConfig.pathSwagger}`,
  swaggerUI.serve,
  swaggerUI.setup(swaggerFile),
);

app.use(appConfig.urlBaseApi, router);

mongoose
  .connect(appConfig.dbConnection)
  .then(() => {
    app.listen(`${appConfig.serverPort}`, () => {
      console.log(`\n${appConfig.msgServerStarted}`);

      console.log(messageSwaggerUp);
    });
  })
  .catch((err) => console.error(err));
