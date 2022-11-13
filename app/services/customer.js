const customerModel = require('../models/Customer');
const constant = require('../helpers/constants');
const validatorCustomer = require('../validators/customer');
const jwtService = require('./jwt');

exports.findById = async (req) => {

  const response = {
    statusCode: 404, success: false, jsonBody: 'Not Found',
  };

  const idCustomer = req.params.id;

  if (idCustomer === null || idCustomer === undefined) {

    response.statusCode = constant.HTTP_MSG_ERROR_400;
    response.success = false;
    response.jsonBody = 'id Não informado!';
    return response;

  }

  const result = await customerModel.findByIdCustomer(idCustomer);

  if (!result.wasSuccess) {

    response.statusCode = 500;
    response.success = false;
    response.jsonBody = constant.HTTP_MSG_ERROR_500;
    return response;

  }

  if (result.customer === undefined || result.customer === null) {

    return response;

  }

  response.statusCode = 200;
  response.success = true;
  response.jsonBody = result.customer;

  return response;

};

exports.findByNuDocument = async (req) => {

  const response = {
    statusCode: 404, success: false, jsonBody: constant.HTTP_MSG_ERROR_404,
  };

  const { nuDocument } = req.params;

  if (nuDocument === null || nuDocument === undefined) {

    response.statusCode = 400;
    response.success = false;
    response.jsonBody = 'nuDocument não informado!';
    return response;

  }

  const result = await customerModel.findByNuDocument(nuDocument);

  if (!result.wasSuccess) {

    response.statusCode = 500;
    response.success = false;
    response.jsonBody = constant.HTTP_MSG_ERROR_500;
    return response;

  }

  if (result.customer === undefined || result.customer === null) {

    return response;

  }

  response.statusCode = 200;
  response.success = true;
  response.jsonBody = result.customer;

  return response;

};

exports.saveCustomer = async (req) => {

  const response = {
    statusCode: 400, success: false, jsonBody: constant.HTTP_MSG_ERROR_400,
  };

  let returnValidate = { wasSuccess: true, messages: [] };
  const customer = req.body;

  customer.idUserRegister = (await jwtService.getUserDataReq(req)).id;
  customer.idLastUserEdit = (await jwtService.getUserDataReq(req)).id;
  returnValidate = await validatorCustomer.validateSaveCustomer(customer);

  if (!returnValidate.wasSuccess) {

    response.statusCode = 400;
    response.success = false;
    response.jsonBody = JSON.parse(JSON.stringify(returnValidate.messages));
    return response;

  }

  const result = await customerModel.findByNuDocument(customer.nuDocument);

  if (!result.wasSuccess) {

    response.statusCode = 500;
    response.success = false;
    response.jsonBody = constant.HTTP_MSG_ERROR_500;
    return response;

  }

  if (result.customer !== undefined && result.customer !== null) {

    response.statusCode = 400;
    response.success = false;
    returnValidate.messages.push('O número do documento informado, já existe!');
    response.jsonBody = JSON.parse(JSON.stringify(returnValidate.messages));
    return response;

  }

  const resultSave = await customerModel.saveNew(customer);

  if (!resultSave.wasSuccess) {

    response.statusCode = 500;
    response.success = false;
    response.jsonBody = constant.HTTP_MSG_ERROR_500;
    return response;

  }

  response.statusCode = 201;
  response.success = true;
  response.jsonBody = resultSave.customer;

  return response;

};

exports.updateCustomer = async (req) => {

  const response = {
    statusCode: 400,
    success: false,
    jsonBody: constant.HTTP_MSG_ERROR_400,
  };

  const idCustomer = req.params.id;
  const customer = req.body;
  customer.id = idCustomer;

  if (idCustomer === null || idCustomer === undefined) {

    response.statusCode = 400;
    response.success = false;
    response.jsonBody = 'id Não informado!';
    return response;

  }

  let returnValidate = { wasSuccess: true, messages: [] };
  returnValidate = await validatorCustomer.validateSaveCustomer(customer);

  if (!returnValidate.wasSuccess) {

    response.statusCode = 400;
    response.success = false;
    response.jsonBody = JSON.parse(JSON.stringify(returnValidate.messages));
    return response;

  }

  const resultFind = await customerModel.findByIdCustomer(idCustomer);

  if (!resultFind.wasSuccess) {

    response.statusCode = 500;
    response.success = false;
    response.jsonBody = constant.HTTP_MSG_ERROR_500;
    return response;

  }

  if (resultFind.customer === null || resultFind.customer === undefined) {

    return response;

  }

  const resultFindDocument = await customerModel.findByNuDocument(customer.nuDocument);

  if (!resultFindDocument.wasSuccess) {

    response.statusCode = 500;
    response.success = false;
    response.jsonBody = constant.HTTP_MSG_ERROR_500;
    return response;

  }

  if ((resultFindDocument.customer !== null || resultFindDocument.customer !== undefined)
    && resultFindDocument.customer.id !== customer.id) {

    response.statusCode = 400;
    response.success = false;
    response.jsonBody = 'O documento informado já pertence a outro cliente!';
    return response;

  }

  customer.idLastUserEdit = (await jwtService.getUserDataReq(req)).id;
  const resultUpdate = await customerModel.updateCustomer(customer);

  if (!resultUpdate.wasSuccess) {

    response.statusCode = 500;
    response.success = false;
    response.jsonBody = constant.HTTP_MSG_ERROR_500;
    return response;

  }

  response.statusCode = 200;
  response.success = true;
  response.jsonBody = resultUpdate.customer;

  return response;

};