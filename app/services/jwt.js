const jwt = require('jsonwebtoken');
const appConfig = require('../config/app.config');

exports.checkAuth = async (reqData) => {
  let response = {
    statusCode: 401, success: false, jsonBody: 'Invalid credentials',
  };

  if (reqData.body.username === 'user' && reqData.body.password === '#321@user') {
    const token = {};
    const id = reqData.body.username;
    token.acess_token = jwt.sign(
      { id },
      appConfig.token.secret,

      { expiresIn: (60 * appConfig.token.minutesExpiration) },
    );
    token.token_type = appConfig.token.tokenType;
    token.expires_in = 60 * appConfig.token.minutesExpiration;
    token.date_time_expiration = new Date(+new Date() + (60 * appConfig.token.minutesExpiration));
    response = {
      statusCode: 200, success: true, jsonBody: token,
    };
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