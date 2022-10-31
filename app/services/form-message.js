const Message = require('../models/ContactMessage');

exports.SaveMessage = async (reqBody) => {
  const response = {
    statusCode: 400, success: false, jsonBody: 'Bad Request',
  };

  const {
    nmContact, deEmail, deMessage, deTelephone,
  } = reqBody;

  const message = {};

  message.NmContact = nmContact;
  message.DeEmail = deEmail;
  message.DeTelephone = deTelephone;
  message.DeMessage = deMessage;
  message.IdContactMessage = 4;
  // eslint-disable-next-line no-console
  console.error(message);

  try {
    await Message.create(message);
    response.statusCode = 201;
    response.success = true;
    response.jsonBody = 'OK';
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    response.statusCode = 500;
    response.success = false;
    response.jsonBody = 'Internarl Server Error';
  }

  return response;
};