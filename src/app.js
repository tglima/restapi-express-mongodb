import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morganBody from 'morgan-body';
import swaggerUI from 'swagger-ui-express';
import Youch from 'youch';
import authUtil from './app/utils/auth.util';
import config from './app/utils/config.util';
import routes from './routes';

const Constants = require('./app/utils/constants.util');
const swaggerFile = require('../swagger.json');

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 120,
  statusCode: 429,
  message: Constants.MsgStatus429,
});

class App {
  constructor() {
    this.server = express();
    this.database();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  database() {
    if (config.getNodeEnv() !== Constants.test) {
      mongoose.set('strictQuery', false);
      mongoose.connect(config.getDbConnectionString(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(helmet.ieNoOpen());
    this.server.use(helmet.hidePoweredBy());
    this.server.use('/', apiLimiter);
    this.server.use(
      config.getPathSwagger(),
      swaggerUI.serve,
      swaggerUI.setup(swaggerFile)
    );
    morganBody(this.server, { prettify: false });

    this.server.use(async (req, res, next) => {
      // Condicional para ignorar a req relacionado ao favicon
      if (req.originalUrl === '/favicon.ico') {
        res.status(404).send({
          success: false,
          message: Constants.MsgStatus404,
        });
        return;
      }

      const mustContinueReq = await authUtil.validateAuthReq(req);

      if (!mustContinueReq) {
        res.status(401).send({
          success: false,
          message: Constants.MsgStatus401Alt,
        });

        return;
      }

      next();
    });
  }

  routes() {
    this.server.use(config.getUrlBaseApi(), routes);
  }

  exceptionHandler() {
    this.server.use(async (err, request, response, next) => {
      const errors = await new Youch(err, request).toJSON();
      return response.status(500).json(errors);
    });
  }
}

export default new App().server;
