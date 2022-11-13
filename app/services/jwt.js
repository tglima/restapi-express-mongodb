const jwt = require('jsonwebtoken');
const appConfig = require('../config/app.config');
const User = require('../models/User');
const URLAccessControl = require('../models/UrlAccessControl');
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

  try {

    if (userDataReq.idRole === appConfig.superUser.idRole) {

      return next();

    }

    let urlBase = req.originalUrl;

    if (req.originalUrl.includes('=')) {

      const array = req.originalUrl.split('=');
      urlBase = `${array[0]}`;

    }

    urlBase = urlBase.replace(`/api/v${appConfig.api.nuVersion}`, '');

    const accessControl = await URLAccessControl.findOne({ url: urlBase, isActive: true });

    if (accessControl === null || accessControl === undefined) {

      return res.status(401).json({ success: false, message: msgUserWithoutPermission });

    }

    if (req.method.toString().toUpperCase() === 'GET' && accessControl.read.idRolesAllowed.includes(userDataReq.idRole)) {

      return next();

    }

    if (req.method.toString().toUpperCase() === 'POST' && accessControl.post.idRolesAllowed.includes(userDataReq.idRole)) {

      return next();

    }

    if (req.method.toString().toUpperCase() === 'PUT' && accessControl.update.idRolesAllowed.includes(userDataReq.idRole)) {

      return next();

    }

  } catch (error) {

    // eslint-disable-next-line no-console
    console.error(error);
    return res.status(401).json({ success: false, message: msgUserWithoutPermission });

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