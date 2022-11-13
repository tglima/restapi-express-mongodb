const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const appConfig = require('./app/config/app.config');
const homeRoutes = require('./app/routes/home');
const contactMessageRoutes = require('./app/routes/contact-message');
const customerRoutes = require('./app/routes/customer');
const productRoutes = require('./app/routes/product');
const jwtRoutes = require('./app/routes/jwt');
app.use(bodyParser.json());

app.use(`/api/v${appConfig.nuVersionApi}`, homeRoutes);
app.use(`/api/v${appConfig.nuVersionApi}/contact`, contactMessageRoutes);
app.use(`/api/v${appConfig.nuVersionApi}/customer`, customerRoutes);
app.use(`/api/v${appConfig.nuVersionApi}/product`, productRoutes);
app.use(`/api/v${appConfig.nuVersionApi}/`, jwtRoutes);

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