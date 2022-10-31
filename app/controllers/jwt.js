const jwtService = require('../services/jwt');

exports.auth = async function (req, res) {
  const response = await jwtService.checkAuthDb(req.body);
  return res.status(response.statusCode).send(response.jsonBody);
};