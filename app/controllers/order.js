const orderService = require('../services/order');

exports.saveOrder = async (req, res) => {

  const response = await orderService.saveNewOrder(req);
  return res.status(response.statusCode).send(response.jsonBody);

};

exports.findByNuDocument = async (req, res) => {

  const response = await orderService.findOrderByNuDocumentCustomer(req);
  return res.status(response.statusCode).send(response.jsonBody);

};

exports.findByIdCustomer = async (req, res) => {

  const response = await orderService.findOrderByIdCustomer(req);
  return res.status(response.statusCode).send(response.jsonBody);

};

exports.updateOrder = async (req, res) => {

  const response = await orderService.updateOrder(req);
  return res.status(response.statusCode).send(response.jsonBody);

};

exports.cancelOrder = async (req, res) => {

  const response = await orderService.findAndCancelOrder(req);
  return res.status(response.statusCode).send(response.jsonBody);

};