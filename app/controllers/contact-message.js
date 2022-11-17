const contactMessageService = require('../services/contact-message');

exports.save = async (req, res) => {

  const response = await contactMessageService.SaveMessage(req);
  return res.status(response.statusCode).send(response.jsonBody);

};