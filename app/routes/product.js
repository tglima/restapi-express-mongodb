const express = require('express');
const router = express.Router();
const productService = require('../services/product');
const logService = require('../services/apiLog');

const findAll = async (req, res) => {
  const dtStart = new Date().toJSON();

  const response = await productService.findAll();

  await logService.saveLogDB(req, response, dtStart);

  return res.status(response.statusCode).send(response.jsonBody);
};

const findById = async (req, res) => {
  const dtStart = new Date().toJSON();

  const response = await productService.findById(req);

  await logService.saveLogDB(req, response, dtStart);

  return res.status(response.statusCode).send(response.jsonBody);
};

router.get('/find', findAll);
router.get('/find/id=:id', findById);
module.exports = router;
