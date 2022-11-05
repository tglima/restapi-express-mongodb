const jwt = require('jsonwebtoken');
const appConfig = require('../config/app.config');
const User = require('../models/User');
const AccessRole = require('../models/acessRole');
const msgUserWithoutPermission = 'User without permission';
const msgInvalidCredentials = 'Invalid credentials';

exports.checkAuthDb = async (reqBody) => {
  const response = {
    statusCode: 401, success: false, jsonBody: 'Invalid credentials',
  };

  try {
    const user = await User.findOne(
      { deUserName: reqBody.username, dePassword: reqBody.password, isActive: true },
    );

    if (user === undefined || user === null) {
      return response;
    }

    const token = {};
    token.acess_token = jwt.sign(
      { idRole: user.idRole, id: user.id, idUserRegister: user.idUser },
      appConfig.token.secret,
      { expiresIn: (60 * appConfig.token.minutesExpiration) },
    );

    token.token_type = appConfig.token.tokenType;
    token.expires_in = 60 * appConfig.token.minutesExpiration;
    token.date_time_expiration = new Date(+new Date() + (60 * appConfig.token.minutesExpiration));
    response.statusCode = 200;
    response.success = true;
    response.jsonBody = token;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    response.statusCode = 500;
    response.success = false;
    response.jsonBody = 'Internal Server Error';
  }

  return response;
};

// eslint-disable-next-line consistent-return
exports.verifyJWT = async (req, res, next) => {
  const bearerHeader = req.headers.authorization.replace('Bearer ', '');

  if (req.headers.authorization === undefined) {
    return res.status(401).json({ success: false, message: msgInvalidCredentials });
  }

  if (!bearerHeader) {
    return res.status(401).json({ success: false, message: msgInvalidCredentials });
  }

  const userDataReq = await this.getUserDataReq(req);

  let acessRole;

  try {

    if (userDataReq.idRole === appConfig.superUser.idRole) {
      return next();
    }

    acessRole = await AccessRole.findOne(
      { endpoint: req.originalUrl, idRole: userDataReq.idRole },
    );

    if (acessRole === null || acessRole === undefined) {
      return res.status(401).json({ success: false, message: msgUserWithoutPermission });
    }

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return res.status(401).json({ success: false, message: msgUserWithoutPermission });
  }

  const nmMethod = req.method.toString();

  if (nmMethod.toUpperCase() === 'GET' && acessRole.read === true) {
    return next();
  }

  if (nmMethod.toUpperCase() === 'POST' && acessRole.post) {
    return next();
  }

  return res.status(401).json({ success: false, message: msgUserWithoutPermission });
};

exports.getUserDataReq = async (req) => {
  const userDataReq = appConfig.guestUser;

  if (req.headers.authorization === undefined) {
    return userDataReq;
  }

  const bearerHeader = req.headers.authorization.replace('Bearer ', '');
  if (!bearerHeader) {
    return userDataReq;
  }

  jwt.verify(bearerHeader, appConfig.token.secret, (error, decoded) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return userDataReq;
    }
    userDataReq.id = decoded.id;
    userDataReq.idUserRegister = decoded.idUserRegister;
    userDataReq.idRole = decoded.idRole;

    return userDataReq;
  });

  return userDataReq;
};