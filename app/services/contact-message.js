const ContactMessage = require('../models/ContactMessage');

exports.SaveMessage = async (reqBody) => {

  const response = {
    statusCode: 400, success: false, jsonBody: 'Bad Request',
  };

  const message = reqBody;

  try {

    await ContactMessage.create(message);
    response.statusCode = 201;
    response.success = true;
    response.jsonBody = 'OK';

  } catch (error) {

    // eslint-disable-next-line no-console
    console.error(error);
    response.statusCode = 500;
    response.success = false;
    response.jsonBody = 'Internal Server Error';

  }

  return response;

};