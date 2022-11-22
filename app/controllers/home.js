const logService = require('../services/apiLog');
const constant = require('../helpers/constants');

exports.getHome = async (req, res) => {

  const dtStart = new Date().toJSON();
  const response = constant.RESULT_DEF_ERROR_404;
  await logService.saveLogDB(req, response, dtStart);
  return res.status(response.statusCode).send(response.jsonBody);

};