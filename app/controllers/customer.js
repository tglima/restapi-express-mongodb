const customerService = require('../services/customer');

exports.findById = async (req, res) => {
  const response = await customerService.FindById(req);
  return res.status(response.statusCode).send(response.jsonBody);
};