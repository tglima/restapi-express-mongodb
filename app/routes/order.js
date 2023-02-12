const express = require('express');
const router = express.Router();
const jwtService = require('../services/jwt');
const orderService = require('../services/order');
const logService = require('../services/apiLog');

const saveOrder = async (req, res) => {
  const dtStart = new Date().toJSON();

  const response = await orderService.saveNewOrder(req);

  await logService.saveLogDB(req, response, dtStart);

  return res.status(response.statusCode).send(response.jsonBody);
};

const findByNuDocument = async (req, res) => {
  const dtStart = new Date().toJSON();

  const response = await orderService.findOrderByNuDocumentCustomer(req);

  await logService.saveLogDB(req, response, dtStart);

  return res.status(response.statusCode).send(response.jsonBody);
};

const findByIdCustomer = async (req, res) => {
  const dtStart = new Date().toJSON();

  const response = await orderService.findOrderByIdCustomer(req);

  await logService.saveLogDB(req, response, dtStart);

  return res.status(response.statusCode).send(response.jsonBody);
};

const updateOrder = async (req, res) => {
  const dtStart = new Date().toJSON();

  const response = await orderService.updateOrder(req);

  await logService.saveLogDB(req, response, dtStart);

  return res.status(response.statusCode).send(response.jsonBody);
};

const cancelOrder = async (req, res) => {
  const dtStart = new Date().toJSON();

  const response = await orderService.findAndCancelOrder(req);

  await logService.saveLogDB(req, response, dtStart);

  return res.status(response.statusCode).send(response.jsonBody);
};

router.post('/save', jwtService.verifyJWT, saveOrder);
router.get(
  '/find/customer/nuDocument=:nuDocument',
  jwtService.verifyJWT,
  findByNuDocument,
);
router.get(
  '/find/customer/idCustomer=:idCustomer',
  jwtService.verifyJWT,
  findByIdCustomer,
);
router.put('/update/id=:id', jwtService.verifyJWT, updateOrder);
router.delete('/delete/id=:id', jwtService.verifyJWT, cancelOrder);
module.exports = router;
