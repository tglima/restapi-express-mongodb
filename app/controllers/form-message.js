const formMessageService = require('../services/form-message');

exports.save = async (req, res) => {
  const response = await formMessageService.SaveMessage(req.body);
  return res.status(response.statusCode).send(response.jsonBody);
};