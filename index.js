const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const appConfig = require('./app/config/app.config');
const homeRoutes = require('./app/routes/home');
const jwtRoutes = require('./app/routes/jwt');
app.use(bodyParser.json());

app.use(`/api/v${appConfig.api.nuVersion}`, homeRoutes);
app.use(`/api/v${appConfig.api.nuVersion}`, jwtRoutes);

app.listen(`${appConfig.server.port}`, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor rodando na porta: ${appConfig.server.port}`);
});