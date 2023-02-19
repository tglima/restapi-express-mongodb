const express = require('express');
const router = express.Router();
const customerService = require('../services/customer');
const logService = require('../services/apiLog');

const findById = async (req, res) => {
  const dtStart = new Date().toJSON();

  const response = await customerService.findById(req);

  await logService.saveLogDB(req, response, dtStart);

  return res.status(response.statusCode).send(response.jsonBody);
};

const findByNuDocument = async (req, res) => {
  const dtStart = new Date().toJSON();

  const response = await customerService.findByNuDocument(req);

  await logService.saveLogDB(req, response, dtStart);

  return res.status(response.statusCode).send(response.jsonBody);
};

const saveCustomer = async (req, res) => {
  const dtStart = new Date().toJSON();

  const response = await customerService.saveCustomer(req);

  await logService.saveLogDB(req, response, dtStart);

  return res.status(response.statusCode).send(response.jsonBody);
};

const updateCustomer = async (req, res) => {
  const dtStart = new Date().toJSON();

  const response = await customerService.updateCustomer(req);

  await logService.saveLogDB(req, response, dtStart);

  return res.status(response.statusCode).send(response.jsonBody);
};

router.post('/save', saveCustomer);
router.put('/update/id=:id', updateCustomer);
router.get('/find/id=:id', findById);
router.get('/find/nuDocument=:nuDocument', findByNuDocument);
module.exports = router;
