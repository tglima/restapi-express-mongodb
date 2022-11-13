const customerService = require('../services/customer');

exports.findById = async (req, res) => {

  const response = await customerService.findById(req);
  return res.status(response.statusCode).send(response.jsonBody);

};

exports.findByNuDocument = async (req, res) => {

  const response = await customerService.findByNuDocument(req);
  return res.status(response.statusCode).send(response.jsonBody);

};

exports.saveCustomer = async (req, res) => {

  const response = await customerService.saveCustomer(req);
  return res.status(response.statusCode).send(response.jsonBody);

};

exports.updateCustomer = async (req, res) => {

  const response = await customerService.updateCustomer(req);
  return res.status(response.statusCode).send(response.jsonBody);

};