const customerService = require('../services/customer');

exports.findById = async (req, res) => {

  const response = await customerService.FindById(req);
  return res.status(response.statusCode).send(response.jsonBody);

};

exports.findByNuDocument = async (req, res) => {

  const response = await customerService.FindByNuDocument(req);
  return res.status(response.statusCode).send(response.jsonBody);

};

exports.saveCustomer = async (req, res) => {

  const response = await customerService.SaveCustomer(req);
  return res.status(response.statusCode).send(response.jsonBody);

};