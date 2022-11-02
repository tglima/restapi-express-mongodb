const jwt = require('jsonwebtoken');
const appConfig = require('../config/app.config');
const User = require('../models/User');

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
    const userToken = { idRole: user.idRole, id: user.id, idUser: user.idUser };

    token.acess_token = jwt.sign(
      { id: userToken },
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

exports.verifyJWT = (req, res, next) => {
  const responseUnauthorized = res.status(401).json({ success: false, message: 'Invalid credentials' });

  if (req.headers.authorization === undefined) {
    return responseUnauthorized;
  }

  const bearerHeader = req.headers.authorization.replace('Bearer ', '');
  if (!bearerHeader) {
    return responseUnauthorized;
  }

  let responseJWTVerify = responseUnauthorized;

  jwt.verify(bearerHeader, appConfig.token.secret, (err, decoded) => {
    if (err) {
      return;
    }

    req.userId = decoded.id;
    responseJWTVerify = next();
  });

  return responseJWTVerify;
};