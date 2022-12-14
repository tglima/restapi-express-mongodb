/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const appConfig = require('./app/config/app.config');
const router = require('./app/routes/routes');
const swaggerFile = require('./swagger.json');
const messageSwaggerUp = `Swagger disponível em: ${appConfig.urlPathSwagger}\n`;

app.use(express.json());
app.use(bodyParser.json());
app.use(`${appConfig.pathSwagger}`, swaggerUI.serve, swaggerUI.setup(swaggerFile));
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