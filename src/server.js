/* eslint-disable no-console */
import express from 'express';
import helmet from 'helmet';
import morganBody from 'morgan-body';
import Youch from 'youch';
import routes from './routes';
import { NU_PORT, TRUST_PROXY, TRUST_PROXY_VALUE, getDbConnection } from './services/configServices';
import { INTERNAL_SERVER_ERROR } from './constants/errorMessages';
import { MSG_START_SERVER } from './constants/serverMessages';

const server = express();

const exceptionHandler = () => {
  server.use(async (err, request, response, next) => {
    const errors = await new Youch(err, request).toJSON();
    console.error(errors);

    console.error({ method: 'exceptionHandler', error: err }).then(() => {
      return response.status(500).json({ messages: [INTERNAL_SERVER_ERROR] });
    });
  });
};

const middlewares = () => {
  server.use(express.json());
  server.use(helmet());
  server.set(TRUST_PROXY, TRUST_PROXY_VALUE);
  server.use(routes);
  morganBody(server);
  exceptionHandler();
};

async function startServer() {
  getDbConnection();
  middlewares();
  server.listen(NU_PORT, () => {
    console.log(MSG_START_SERVER);
  });
}

startServer();
