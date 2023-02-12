const messageModel = require('../models/ContactMessage');
const constant = require('../helpers/constants');
const messageValidator = require('../validators/contact-message');

exports.saveMessage = async (req) => {
  let response = constant.RESULT_DEF_201;

  const message = req.body;

  let returnValidate = { wasSuccess: true, messages: [] };
  returnValidate = await messageValidator.validateSaveMessage(message);

  if (!returnValidate.wasSuccess) {
    response = constant.RESULT_DEF_ERROR_400;
    response.jsonBody = JSON.parse(JSON.stringify(returnValidate.messages));
    return response;
  }

  const resultSave = await messageModel.saveNew(message);

  if (!resultSave.wasSuccess) {
    response = constant.RESULT_DEF_ERROR_500;
    response.error = resultSave.error;
    return response;
  }

  response.jsonBody = constant.HTTP_MSG_DEF_201;

  return response;
};
