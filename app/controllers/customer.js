const customerService = require('../services/customer');
const logService = require('../services/apiLog');

exports.findById = async (req, res) => {

  const dtStart = new Date().toJSON();

  const response = await customerService.findById(req);

  await logService.saveLogDB(req, response, dtStart);

  return res.status(response.statusCode).send(response.jsonBody);

};

exports.findByNuDocument = async (req, res) => {

  const dtStart = new Date().toJSON();

  const response = await customerService.findByNuDocument(req);

  await logService.saveLogDB(req, response, dtStart);

  return res.status(response.statusCode).send(response.jsonBody);

};

exports.saveCustomer = async (req, res) => {

  const dtStart = new Date().toJSON();

  const response = await customerService.saveCustomer(req);

  await logService.saveLogDB(req, response, dtStart);

  return res.status(response.statusCode).send(response.jsonBody);

};

exports.updateCustomer = async (req, res) => {

  const dtStart = new Date().toJSON();

  const response = await customerService.updateCustomer(req);

  await logService.saveLogDB(req, response, dtStart);

  return res.status(response.statusCode).send(response.jsonBody);

};