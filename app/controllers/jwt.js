const jwtService = require('../services/jwt');
const logService = require('../services/apiLog');

exports.auth = async (req, res) => {

  const dtStart = new Date().toJSON();
  const response = await jwtService.checkAuthDb(req.body);
  await logService.saveLogDB(req, response, dtStart);
  return res.status(response.statusCode).send(response.jsonBody);

};