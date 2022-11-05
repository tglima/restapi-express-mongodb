const productService = require('../services/product');

exports.findAll = async (req, res) => {

  const response = await productService.FindAll();
  return res.status(response.statusCode).send(response.jsonBody);

};

exports.findById = async (req, res) => {

  const response = await productService.FindById(req);
  return res.status(response.statusCode).send(response.jsonBody);

};

exports.saveNew = async (req, res) => {

  const response = await productService.SaveNew(req);
  return res.status(response.statusCode).send(response.jsonBody);

};