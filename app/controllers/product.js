const productService = require('../services/product');

exports.findAll = async (req, res) => {

  const response = await productService.findAll();
  return res.status(response.statusCode).send(response.jsonBody);

};

exports.findById = async (req, res) => {

  const response = await productService.findById(req);
  return res.status(response.statusCode).send(response.jsonBody);

};