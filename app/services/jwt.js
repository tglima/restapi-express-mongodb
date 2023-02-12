const jwt = require('jsonwebtoken');
const appConfig = require('../config/app.config');
const userModel = require('../models/User');
const accessControlModel = require('../models/UrlAccessControl');
const constant = require('../helpers/constants');
const logService = require('./apiLog');

const checkPermissionUserReq = async (req) => {
  const result = await this.getUserDataReq(req);

  if (!result.wasSuccess) {
    return false;
  }

  const { userDataReq } = result;

  if (userDataReq.idRole === appConfig.superUser.idRole) {
    return true;
  }

  let urlBase = req.originalUrl;

  if (req.originalUrl.includes('=')) {
    const array = req.originalUrl.split('=');
    urlBase = `${array[0]}`;
  }

  urlBase = urlBase.replace(`/api/v${appConfig.nuVersionApi}`, '');

  const resultFindAccess = await accessControlModel.findByUrlBase(urlBase);

  if (
    !resultFindAccess.wasSuccess ||
    resultFindAccess.urlAccessControl === undefined
  ) {
    return false;
  }

  const accessControl = resultFindAccess.urlAccessControl;

  if (
    req.method.toString().toUpperCase() === 'GET' &&
    accessControl.read.idRolesAllowed.includes(userDataReq.idRole)
  ) {
    return true;
  }

  if (
    req.method.toString().toUpperCase() === 'POST' &&
    accessControl.post.idRolesAllowed.includes(userDataReq.idRole)
  ) {
    return true;
  }

  if (
    req.method.toString().toUpperCase() === 'PUT' &&
    accessControl.update.idRolesAllowed.includes(userDataReq.idRole)
  ) {
    return true;
  }
  if (
    req.method.toString().toUpperCase() === 'DELETE' &&
    accessControl.delete.idRolesAllowed.includes(userDataReq.idRole)
  ) {
    return true;
  }

  return false;
};

const generateToken = async (user) => {
  const token = {};
  token.access_token = jwt.sign(
    {
      idRole: user.idRole,
      idUserRegister: user.id,
    },
    appConfig.token.secret,
    { expiresIn: 60 * appConfig.token.minutesExpiration },
  );

  token.token_type = appConfig.token.tokenType;
  token.expires_in = 60 * appConfig.token.minutesExpiration;
  token.date_time_expiration = new Date(
    +new Date() + 60 * appConfig.token.minutesExpiration,
  );

  return token;
};

exports.checkAuthDb = async (reqBody) => {
  let response = constant.RESULT_DEF_ERROR_401;

  const resultFind = await userModel.findByUsernameAndPass(
    reqBody.username,
    reqBody.password,
  );

  if (resultFind.user === undefined) {
    return response;
  }

  if (!resultFind.wasSuccess) {
    response = constant.RESULT_DEF_ERROR_500;
    response.error = resultFind.error;
    return response;
  }

  response = constant.RESULT_DEF_200;
  response.jsonBody = await generateToken(resultFind.user);

  return response;
};

// eslint-disable-next-line consistent-return
exports.verifyJWT = async (req, res, next) => {
  const dtStart = new Date().toJSON();
  const mustContinue = await checkPermissionUserReq(req);

  if (mustContinue) {
    return next();
  }

  const response = {
    statusCode: 401,
    jsonBody: constant.HTTP_MSG_ERROR_401_ALT,
  };
  await logService.saveLogDB(req, response, dtStart);

  return res.status(response.statusCode).send(response.jsonBody);
};

exports.getUserDataReq = async (req) => {
  let result = {
    wasSuccess: true,
    userDataReq: appConfig.guestUser,
    error: undefined,
  };

  let bearerHeader;

  if (
    req.headers.authorization !== undefined &&
    req.headers.authorization.includes('Bearer')
  ) {
    bearerHeader = req.headers.authorization.replace('Bearer ', '');
  }

  if (!bearerHeader) {
    return result;
  }

  result = await jwt.verify(
    bearerHeader,
    appConfig.token.secret,
    (error, decoded) => {
      if (error) {
        result.error = error;
        result.wasSuccess = false;
        return result;
      }

      result.userDataReq.idUserRegister = decoded.idUserRegister;
      result.userDataReq.idRole = decoded.idRole;

      return result;
    },
  );

  return result;
};
