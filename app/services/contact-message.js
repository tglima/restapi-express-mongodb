const messageModel = require('../models/ContactMessage');
const constant = require('../helpers/constants');
const messageValidator = require('../validators/contact-message');

exports.saveMessage = async (req) => {

  const response = {
    statusCode: 400, success: false, jsonBody: constant.HTTP_MSG_ERROR_400,
  };

  const message = req.body;
  message.deTelephone = message.deTelephone.replace(/[^0-9]/g, '');

  let returnValidate = { wasSuccess: true, messages: [] };
  returnValidate = await messageValidator.validatesaveMessage(message);

  if (!returnValidate.wasSuccess) {

    response.statusCode = 400;
    response.success = false;
    response.jsonBody = JSON.parse(JSON.stringify(returnValidate.messages));
    return response;

  }

  const resultSave = await messageModel.saveNew(message);

  if (!resultSave.wasSuccess) {

    return constant.RESULT_DEF_ERROR_500;

  }

  response.statusCode = 201;
  response.success = true;
  response.jsonBody = constant.HTTP_MSG_ERROR_201;

  return response;

};