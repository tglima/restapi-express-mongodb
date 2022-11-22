const constant = require('../helpers/constants');
const customerModel = require('../models/Customer');
const productModel = require('../models/Product');
const orderModel = require('../models/Order');
const jwtService = require('./jwt');
const orderValidator = require('../validators/order');

exports.findOrderByNuDocumentCustomer = async (req) => {

  const response = {
    statusCode: 200, success: true, jsonBody: null,
  };

  const { nuDocument } = req.params;

  if (nuDocument === null || nuDocument === undefined) {

    return constant.RESULT_DEF_ERROR_400;

  }

  const result = await customerModel.findByNuDocument(nuDocument);

  if (!result.wasSuccess) {

    return constant.RESULT_DEF_ERROR_500;

  }

  if (result.customer === undefined) {

    return constant.RESULT_DEF_ERROR_404;

  }

  const resultOrder = await orderModel.findOrderByIdCustomer(result.customer.id);

  if (!resultOrder.wasSuccess) {

    return constant.RESULT_DEF_ERROR_500;

  }

  if (resultOrder.order === undefined) {

    return constant.RESULT_DEF_ERROR_404;

  }

  response.jsonBody = resultOrder.order;
  return response;

};

exports.findOrderByIdCustomer = async (req) => {

  const response = {
    statusCode: 200, success: true, jsonBody: null,
  };

  const { idCustomer } = req.params;

  if (idCustomer === null || idCustomer === undefined) {

    return constant.RESULT_DEF_ERROR_400;

  }

  const resultOrder = await orderModel.findOrderByIdCustomer(idCustomer);

  if (!resultOrder.wasSuccess) {

    return constant.RESULT_DEF_ERROR_500;

  }

  if (resultOrder.order === undefined) {

    return constant.RESULT_DEF_ERROR_404;

  }

  response.jsonBody = resultOrder.order;
  return response;

};

exports.saveNewOrder = async (req) => {

  const response = {
    statusCode: 201, success: true, jsonBody: null,
  };

  const order = req.body;
  let returnValidate = { wasSuccess: true, messages: [] };
  returnValidate = await orderValidator.validateSaveNewOrder(order);

  if (!returnValidate.wasSuccess) {

    response.statusCode = 400;
    response.success = false;
    response.jsonBody = JSON.parse(JSON.stringify(returnValidate.messages));
    return response;

  }

  const resultUserData = await jwtService.getUserDataReq(req);

  if (!resultUserData.wasSuccess) {

    return constant.RESULT_DEF_ERROR_500;

  }

  const resultFindProduct = await productModel.findProductById(order.idProduct);

  const userData = resultUserData.userDataReq;
  order.idUserRegister = userData.idUserRegister;
  order.idLastUserEdit = userData.idUserRegister;
  order.nmProduct = resultFindProduct.product.nmProduct;
  order.vlMonthPrice = resultFindProduct.product.vlMonthPrice;

  const resultSave = await orderModel.saveNew(order);

  if (!resultSave.wasSuccess) {

    return constant.RESULT_DEF_ERROR_500;

  }

  response.statusCode = 201;
  response.success = true;
  response.jsonBody = resultSave.order;

  return response;

};

exports.updateOrder = async (req) => {

  const response = {
    statusCode: 200, success: true, jsonBody: null,
  };

  const order = req.body;
  order.id = req.params.id;
  let returnValidate = { wasSuccess: true, messages: [] };

  returnValidate = await orderValidator.validateUpdateOrder(order);

  if (!returnValidate.wasSuccess) {

    response.statusCode = 400;
    response.success = false;
    response.jsonBody = JSON.parse(JSON.stringify(returnValidate.messages));
    return response;

  }

  const resultUserData = await jwtService.getUserDataReq(req);

  if (!resultUserData.wasSuccess) {

    return constant.RESULT_DEF_ERROR_500;

  }

  order.idLastUserEdit = resultUserData.userDataReq.idUserRegister;

  const resultFindProduct = await productModel.findProductById(order.idProduct);

  order.nmProduct = resultFindProduct.product.nmProduct;
  order.vlMonthPrice = resultFindProduct.product.vlMonthPrice;

  const resultUpdate = await orderModel.updateOrder(order);

  if (!resultUpdate.wasSuccess) {

    return constant.RESULT_DEF_ERROR_500;

  }

  response.statusCode = 200;
  response.success = true;
  response.jsonBody = resultUpdate.order;

  return response;

};

exports.findAndCancelOrder = async (req) => {

  const response = {
    statusCode: 200, success: true, jsonBody: null,
  };

  const { id } = req.params;

  if (id === null || id === undefined) {

    return constant.RESULT_DEF_ERROR_400;

  }

  const resultFind = await orderModel.findOrderByIdOrder(id);

  if (!resultFind.wasSuccess) {

    return constant.RESULT_DEF_ERROR_500;

  }

  if (resultFind.order === undefined) {

    return constant.RESULT_DEF_ERROR_404;

  }

  const resultUserData = await jwtService.getUserDataReq(req);

  if (!resultUserData.wasSuccess) {

    return constant.RESULT_DEF_ERROR_500;

  }

  const userData = resultUserData.userDataReq;
  const resultUpd = await orderModel.cancelOrderByIdOrder(id, userData.idUserRegister);

  if (!resultUpd.wasSuccess) {

    return constant.RESULT_DEF_ERROR_500;

  }

  response.jsonBody = constant.HTTP_MSG_DEF_200_DELETE;
  return response;

};