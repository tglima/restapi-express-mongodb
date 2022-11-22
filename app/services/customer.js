const customerModel = require('../models/Customer');
const constant = require('../helpers/constants');
const validatorCustomer = require('../validators/customer');
const jwtService = require('./jwt');

exports.findById = async (req) => {

  const response = constant.RESULT_DEF_200;

  const idCustomer = req.params.id;

  if (idCustomer === null || idCustomer === undefined) {

    const responseWithBadReq = constant.RESULT_DEF_ERROR_400;
    responseWithBadReq.jsonBody = 'id Não informado!';
    return constant.responseWithBadReq;

  }

  const result = await customerModel.findByIdCustomer(idCustomer);

  if (!result.wasSuccess) {

    const responseWithError = constant.RESULT_DEF_ERROR_500;
    responseWithError.error = result.error;
    return responseWithError;

  }

  if (result.customer === undefined) {

    return constant.RESULT_DEF_ERROR_404;

  }

  response.jsonBody = result.customer;

  return response;

};

exports.findByNuDocument = async (req) => {

  let response = constant.RESULT_DEF_ERROR_404;

  const { nuDocument } = req.params;

  if (nuDocument === null || nuDocument === undefined) {

    response.jsonBody = 'nuDocument não informado!';
    return response;

  }

  const result = await customerModel.findByNuDocument(nuDocument);

  if (!result.wasSuccess) {

    const responseWithError = constant.RESULT_DEF_ERROR_500;
    responseWithError.error = result.error;
    return responseWithError;

  }

  if (result.customer === undefined) {

    return response;

  }

  response = constant.RESULT_DEF_200;
  response.jsonBody = result.customer;

  return response;

};

exports.saveCustomer = async (req) => {

  let response = constant.RESULT_DEF_ERROR_400;

  let returnValidate = { wasSuccess: true, messages: [] };
  const customer = req.body;

  const { userDataReq } = await jwtService.getUserDataReq(req);

  customer.idUserRegister = userDataReq.idUserRegister;
  customer.idLastUserEdit = userDataReq.idUserRegister;

  returnValidate = await validatorCustomer.validateSaveCustomer(customer);

  if (!returnValidate.wasSuccess) {

    response.jsonBody = JSON.parse(JSON.stringify(returnValidate.messages));
    return response;

  }

  const resultFind = await customerModel.findByNuDocument(customer.nuDocument);

  if (!resultFind.wasSuccess) {

    const responseWithError = constant.RESULT_DEF_ERROR_500;
    responseWithError.error = resultFind.error;
    return responseWithError;

  }

  if (resultFind.customer !== undefined && resultFind.customer !== null) {

    returnValidate.messages.push('O número do documento informado, já existe!');
    response.jsonBody = JSON.parse(JSON.stringify(returnValidate.messages));
    return response;

  }

  const resultSave = await customerModel.saveNew(customer);

  if (!resultSave.wasSuccess) {

    const responseWithError = constant.RESULT_DEF_ERROR_500;
    responseWithError.error = resultSave.error;
    return responseWithError;

  }

  response = constant.RESULT_DEF_201;
  response.jsonBody = resultSave.customer;

  return response;

};

exports.updateCustomer = async (req) => {

  let response = constant.RESULT_DEF_ERROR_400;

  const idCustomer = req.params.id;
  const customer = req.body;
  customer.id = idCustomer;

  if (idCustomer === null || idCustomer === undefined) {

    response.jsonBody = 'id Não informado!';
    return response;

  }

  let returnValidate = { wasSuccess: true, messages: [] };
  returnValidate = await validatorCustomer.validateSaveCustomer(customer);

  if (!returnValidate.wasSuccess) {

    response.jsonBody = JSON.parse(JSON.stringify(returnValidate.messages));
    return response;

  }

  const resultFind = await customerModel.findByIdCustomer(idCustomer);

  if (!resultFind.wasSuccess) {

    const responseWithError = constant.RESULT_DEF_ERROR_500;
    responseWithError.error = resultFind.error;
    return responseWithError;

  }

  if (resultFind.customer === undefined) {

    return response;

  }

  const resultFindDocument = await customerModel.findByNuDocument(customer.nuDocument);

  if (!resultFindDocument.wasSuccess) {

    const responseWithError = constant.RESULT_DEF_ERROR_500;
    responseWithError.error = resultFindDocument.error;
    return responseWithError;

  }

  if (resultFindDocument.customer !== undefined
      && resultFindDocument.customer.id !== customer.id) {

    response.jsonBody = 'O documento informado já pertence a outro cliente!';
    return response;

  }

  const { userDataReq } = await jwtService.getUserDataReq(req);
  customer.idLastUserEdit = userDataReq.idUserRegister;

  const resultUpdate = await customerModel.updateCustomer(customer);

  if (!resultUpdate.wasSuccess) {

    const responseWithError = constant.RESULT_DEF_ERROR_500;
    responseWithError.error = resultUpdate.error;
    return responseWithError;

  }

  response = constant.RESULT_DEF_200;
  response.jsonBody = resultUpdate.customer;

  return response;

};