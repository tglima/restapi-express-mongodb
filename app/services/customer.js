const Customer = require('../models/Customer');
const Constant = require('../helpers/constants');
const jwtService = require('./jwt');

exports.FindById = async (req) => {

  const response = {
    statusCode: 404, success: false, jsonBody: 'Not Found',
  };

  const idCustomer = req.params.id;

  if (idCustomer === null || idCustomer === undefined) {

    response.statusCode = 400;
    response.success = false;
    response.jsonBody = 'Uninformed id';
    return response;

  }

  let customer;

  try {

    customer = await Customer.findById({ _id: idCustomer, isActive: true });

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
    response.jsonBody = 'Internal Server Error';

  }

  return response;

};

exports.FindByNuDocument = async (req) => {

  const response = {
    statusCode: 404, success: false, jsonBody: 'Not Found',
  };

  const { nuDocument } = req.params;

  if (nuDocument === null || nuDocument === undefined) {

    response.statusCode = 400;
    response.success = false;
    response.jsonBody = 'Uninformed nuDocument';
    return response;

  }

  let customer;

  try {

    customer = await Customer.findOne({ nuDocument, isActive: true });

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
    response.jsonBody = 'Internal Server Error';

  }

  return response;

};

exports.SaveCustomer = async (req) => {

  const response = {
    statusCode: 400, success: false, jsonBody: Constant.HTTP_MSG_ERROR_400,
  };

  try {

    const customer = req.body;

    customer.idUserRegister = (await jwtService.getUserDataReq(req)).idUserRegister;

    const customerDb = await Customer.findOne({ nuDocument: customer.nuDocument, isActive: true });

    if (customerDb !== undefined && customerDb !== null) {

      response.jsonBody = 'O número do documento informado, já existe!';
      response.wasSuccess = false;
      return response;

    }

    const customerDB = await Customer.create(customer);

    response.statusCode = 201;
    response.success = true;
    response.jsonBody = {
      id: customerDB.id, nmCustomer: customer.nmCustomer, nuDocument: customer.nuDocument,
    };

  } catch (error) {

    // eslint-disable-next-line no-console
    console.error(error);
    response.statusCode = 500;
    response.success = false;
    response.jsonBody = Constant.HTTP_MSG_ERROR_500;

  }

  return response;

};