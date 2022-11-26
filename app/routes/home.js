const express = require('express');
const logService = require('../services/apiLog');
const constant = require('../helpers/constants');
const router = express.Router();

const getHome = async (req, res) => {

  const dtStart = new Date().toJSON();
  const response = constant.RESULT_DEF_ERROR_404;
  await logService.saveLogDB(req, response, dtStart);
  return res.status(response.statusCode).send(response.jsonBody);

};

router.get('/', getHome);
router.post('/', getHome);
router.put('/', getHome);
router.delete('/', getHome);
module.exports = router;