const apiLogModel = require('../models/APILog');
const jwtService = require('./jwt');
const util = require('../helpers/util');

exports.saveLogDB = async (req, res, dtStart) => {

  const { userDataReq } = await jwtService.getUserDataReq(req);
  const { idUserRegister } = userDataReq;

  const log = {
    url: req.originalUrl,
    idUserRegister: `${idUserRegister}`,
    reqHeaders: req.headers,
    reqParams: req.params,
    reqBody: req.body,
    reqMethod: req.method,
    resStatusCode: res.statusCode,
    resJsonBody: res.jsonBody,
    error: res.error,
    dtStart: `${dtStart}`,
    dtFinish: util.getDateNowBrazil(),
  };

  await apiLogModel.saveNew(log);

};