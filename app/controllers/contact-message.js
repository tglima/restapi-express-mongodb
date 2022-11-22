const contactMessageService = require('../services/contact-message');
const logService = require('../services/apiLog');

exports.save = async (req, res) => {

  const dtStart = new Date().toJSON();
  const response = await contactMessageService.saveMessage(req);
  await logService.saveLogDB(req, response, dtStart);
  return res.status(response.statusCode).send(response.jsonBody);

};