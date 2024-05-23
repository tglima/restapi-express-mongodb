/* eslint-disable no-console */
import express from 'express';
import helmet from 'helmet';
import morganBody from 'morgan-body';
import Youch from 'youch';
import routes from './routes';

const server = express();

const exceptionHandler = () => {
  server.use(async (err, request, response, next) => {
    const errors = await new Youch(err, request).toJSON();
    console.error(errors);

    console.error({ method: 'exceptionHandler', error: err }).then(() => {
      return response.status(500).json({ messages: ['Erro interno no servidor!'] });
    });
  });
};

const middlewares = () => {
  server.use(express.json());
  server.use(helmet());
  server.set('trust proxy', 0);
  server.use(routes);
  morganBody(server);
  exceptionHandler();
};

async function startServer() {
  const nuPort = 8081;
  middlewares();
  server.listen(nuPort, () => {
    console.log(`'Listen ${nuPort}`);
  });
}

startServer();
