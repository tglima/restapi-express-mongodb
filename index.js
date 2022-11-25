const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const appConfig = require('./app/config/app.config');
const router = require('./app/routes/routes');
const swaggerFile = require('./swagger.json');

app.use(express.json());
app.use(bodyParser.json());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(appConfig.urlBaseApi, router);

mongoose
  .connect(appConfig.dbConnection)
  .then(() => {

    app.listen(`${appConfig.serverPort}`, () => {

      // eslint-disable-next-line no-console
      console.log(`MongoDB + Express started! - Express rodando na porta: ${appConfig.serverPort}`);

    });

  })
// eslint-disable-next-line no-console
  .catch((err) => console.error(err));