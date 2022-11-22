const orderService = require('../services/order');
const logService = require('../services/apiLog');

exports.saveOrder = async (req, res) => {

  const dtStart = new Date().toJSON();

  const response = await orderService.saveNewOrder(req);

  await logService.saveLogDB(req, response, dtStart);

  return res.status(response.statusCode).send(response.jsonBody);

};

exports.findByNuDocument = async (req, res) => {

  const dtStart = new Date().toJSON();

  const response = await orderService.findOrderByNuDocumentCustomer(req);

  await logService.saveLogDB(req, response, dtStart);

  return res.status(response.statusCode).send(response.jsonBody);

};

exports.findByIdCustomer = async (req, res) => {

  const dtStart = new Date().toJSON();

  const response = await orderService.findOrderByIdCustomer(req);

  await logService.saveLogDB(req, response, dtStart);

  return res.status(response.statusCode).send(response.jsonBody);

};

exports.updateOrder = async (req, res) => {

  const dtStart = new Date().toJSON();

  const response = await orderService.updateOrder(req);

  await logService.saveLogDB(req, response, dtStart);

  return res.status(response.statusCode).send(response.jsonBody);

};

exports.cancelOrder = async (req, res) => {

  const dtStart = new Date().toJSON();

  const response = await orderService.findAndCancelOrder(req);

  await logService.saveLogDB(req, response, dtStart);

  return res.status(response.statusCode).send(response.jsonBody);

};