import jwt from 'jsonwebtoken';
import ReturnDTO from '../DTOs/ReturnDTO';
import APILog from '../models/APILogModel';
import Config from './config.util';

const tokenSecret = Config.getTokenSecret();

class Util {
  async getUserDataReq(req) {
    const userDataReq = {
      idUserRegister: Config.getIdGuestUser(),
      idRole: Config.getIdRoleGuestUser(),
    };
    let returnDTO = new ReturnDTO(200, true, userDataReq);
    let bearerHeader;

    if (
      req.headers.authorization !== undefined &&
      req.headers.authorization.includes('Bearer')
    ) {
      bearerHeader = req.headers.authorization.replace('Bearer ', '');
    }

    if (!bearerHeader) {
      return returnDTO;
    }

    returnDTO = await jwt.verify(
      bearerHeader,
      tokenSecret,
      (error, decoded) => {
        if (error) {
          returnDTO.error = error;
          returnDTO.wasSuccess = false;
          return returnDTO;
        }

        returnDTO.jsonBody.idUserRegister = decoded.idUserRegister;
        returnDTO.jsonBody.idRole = decoded.idRole;

        return returnDTO;
      }
    );

    return returnDTO;
  }

  async saveLogDB(req, res, dtStart) {
    const result = await this.getUserDataReq(req);
    const { idUserRegister } = result.jsonBody;

    const log = {
      url: req.originalUrl,
      idUserRegister: `${idUserRegister}`,
      reqHeaders: req.headers,
      reqParams: req.params,
      reqBody: req.body,
      reqMethod: req.method,
      resStatusCode: res.statusCode,
      resJsonBody: res.jsonBody,
      error: res.error,
      dtStart: `${dtStart}`,
      dtFinish: new Date().toJSON(),
    };

    await APILog.saveNew(log);
  }
}

export default new Util();
