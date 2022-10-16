const jwtService = require('../services/jwt');

exports.auth = async function (req, res) {
  const response = await jwtService.checkAuth(req);
  return res.status(response.statusCode).send(response.jsonBody);
};