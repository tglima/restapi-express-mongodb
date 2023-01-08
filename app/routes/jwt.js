const express = require('express');
const router = express.Router();
const jwtService = require('../services/jwt');
const logService = require('../services/apiLog');
const util = require('../helpers/util');

const auth = async (req, res) => {

  const dtStart = util.getDateNowBrazil();
  const response = await jwtService.checkAuthDb(req.body);
  await logService.saveLogDB(req, response, dtStart);
  return res.status(response.statusCode).send(response.jsonBody);

};

router.post('/auth', auth);
module.exports = router;