/* eslint-disable no-console */
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import morganBody from 'morgan-body';
import Youch from 'youch';
import routes from './routes';
import { checkAuth } from './services/validatorServices';
import { saveLogRequest, startLogRequest } from './services/loggerServices';
import { NU_PORT, TRUST_PROXY, TRUST_PROXY_VALUE, getDbConnection } from './services/configServices';
import { INTERNAL_SERVER_ERROR } from './constants/errorMessages';
import { MSG_START_SERVER } from './constants/serverMessages';

const server = express();

const exceptionHandler = () => {
  server.use(async (err, req, res, next) => {
    if (err) {
      const youch = new Youch(err, req);
      const jsonError = await youch.toJSON();

      console.error(JSON.stringify(jsonError));

      req.LogRequest.status_code = 500;
      req.LogRequest.output_resquest = {
        request_id: req.LogRequest.request_id,
        messages: [INTERNAL_SERVER_ERROR],
      };

      await saveLogRequest(req, res);
      res.status(req.LogRequest.status_code).json(req.LogRequest.output_resquest);
    } else {
      next();
    }
  });
};

const middlewares = () => {
  server.use(express.json());
  server.use(startLogRequest);
  server.use(helmet());
  server.set(TRUST_PROXY, TRUST_PROXY_VALUE);
  server.use(checkAuth);
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
