const Customer = require('../models/Customer');

exports.FindById = async (reqBody) => {
  const response = {
    statusCode: 404, success: false, jsonBody: 'Not Found',
  };

  const idCustomer = reqBody;

  if (idCustomer === null || idCustomer === undefined) {
    response.statusCode = 400;
    response.success = false;
    response.jsonBody = 'Uninformed idCustomer';
    return response;
  }

  let customer;

  try {
    customer = Customer.findById(idCustomer);

    if (customer === undefined || customer === null) {
      return response;
    }
    response.statusCode = 200;
    response.success = true;
    response.jsonBody = customer;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    response.statusCode = 500;
    response.success = false;
    response.jsonBody = 'Internarl Server Error';
  }

  return response;
};