const productService = require('../services/product');
const logService = require('../services/apiLog');

exports.findAll = async (req, res) => {

  const dtStart = new Date().toJSON();

  const response = await productService.findAll();

  await logService.saveLogDB(req, response, dtStart);

  return res.status(response.statusCode).send(response.jsonBody);

};

exports.findById = async (req, res) => {

  const dtStart = new Date().toJSON();

  const response = await productService.findById(req);

  await logService.saveLogDB(req, response, dtStart);

  return res.status(response.statusCode).send(response.jsonBody);

};