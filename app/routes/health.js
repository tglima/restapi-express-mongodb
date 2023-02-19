const express = require('express');
const logService = require('../services/apiLog');
const constant = require('../helpers/constants');
const router = express.Router();

const getHealthCheck = async (req, res) => {
  const dtStart = new Date().toJSON();
  const response = constant.RESULT_DEF_200;
  response.jsonBody = { Status: 'OK' };
  await logService.saveLogDB(req, req, dtStart);
  return res.status(response.statusCode).send(response.jsonBody);
};

router.get('/healthcheck', getHealthCheck);

module.exports = router;
