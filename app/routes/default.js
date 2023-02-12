const express = require('express');
const logService = require('../services/apiLog');
const constant = require('../helpers/constants');
const router = express.Router();

const getDefault = async (req, res) => {
  const dtStart = new Date().toJSON();
  const response = constant.RESULT_DEF_ERROR_404;
  await logService.saveLogDB(req, response, dtStart);
  return res.status(response.statusCode).send(response.jsonBody);
};

router.get('/', getDefault);
router.post('/', getDefault);
router.put('/', getDefault);
router.delete('/', getDefault);
module.exports = router;
