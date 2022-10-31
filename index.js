const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const appConfig = require('./app/config/app.config');
const homeRoutes = require('./app/routes/home');
const jwtRoutes = require('./app/routes/jwt');
app.use(bodyParser.json());

app.use(`/api/v${appConfig.api.nuVersion}`, homeRoutes);
app.use(`/api/v${appConfig.api.nuVersion}`, jwtRoutes);

mongoose
  .connect(`mongodb://${appConfig.db.username}:${appConfig.db.password}@${appConfig.db.serverAndPort}/${appConfig.db.nmDatabase}`)
  .then(() => {
    app.listen(`${appConfig.server.port}`, () => {
      // eslint-disable-next-line no-console
      console.log(`MongoDB + Express started! - Express rodando na porta: ${appConfig.server.port}`);
    });
  })
// eslint-disable-next-line no-console
  .catch((err) => console.error(err));