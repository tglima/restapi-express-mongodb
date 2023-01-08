const express = require('express');
const router = express.Router();
const jwtService = require('../services/jwt');
const productService = require('../services/product');
const logService = require('../services/apiLog');
const util = require('../helpers/util');

const findAll = async (req, res) => {

  const dtStart = util.getDateNowBrazil();

  const response = await productService.findAll();

  await logService.saveLogDB(req, response, dtStart);

  return res.status(response.statusCode).send(response.jsonBody);

};

const findById = async (req, res) => {

  const dtStart = util.getDateNowBrazil();

  const response = await productService.findById(req);

  await logService.saveLogDB(req, response, dtStart);

  return res.status(response.statusCode).send(response.jsonBody);

};

router.get('/find', jwtService.verifyJWT, findAll);
router.get('/find/id=:id', jwtService.verifyJWT, findById);
module.exports = router;