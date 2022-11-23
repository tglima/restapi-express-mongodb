const constant = require('../helpers/constants');
const customerModel = require('../models/Customer');
const productModel = require('../models/Product');
const orderModel = require('../models/Order');
const jwtService = require('./jwt');
const orderValidator = require('../validators/order');

exports.findOrderByNuDocumentCustomer = async (req) => {

  let response = constant.RESULT_DEF_200;

  const { nuDocument } = req.params;

  if (nuDocument === null || nuDocument === undefined) {

    response = constant.RESULT_DEF_ERROR_400;
    response.jsonBody = 'nuDocument Não informado!';
    return response;

  }

  const result = await customerModel.findByNuDocument(nuDocument);

  if (!result.wasSuccess) {

    response = constant.RESULT_DEF_ERROR_500;
    response.error = result.error;
    return response;

  }

  if (result.customer === undefined) {

    response = constant.RESULT_DEF_ERROR_404;
    return response;

  }

  const resultOrder = await orderModel.findOrderByIdCustomer(result.customer.id);

  if (!resultOrder.wasSuccess) {

    response = constant.RESULT_DEF_ERROR_500;
    response.error = result.error;
    return response;

  }

  if (resultOrder.order === undefined) {

    response = constant.RESULT_DEF_ERROR_404;
    return response;

  }

  response.jsonBody = resultOrder.order;
  return response;

};

exports.findOrderByIdCustomer = async (req) => {

  let response = constant.RESULT_DEF_200;

  const { idCustomer } = req.params;

  if (idCustomer === null || idCustomer === undefined) {

    response = constant.RESULT_DEF_ERROR_400;
    response.jsonBody = 'idCustomer Não informado!';
    return response;

  }

  const resultOrder = await orderModel.findOrderByIdCustomer(idCustomer);

  if (!resultOrder.wasSuccess) {

    response = constant.RESULT_DEF_ERROR_500;
    response.error = resultOrder.error;
    return response;

  }

  if (resultOrder.order === undefined) {

    response = constant.RESULT_DEF_ERROR_404;
    return response;

  }

  response.jsonBody = resultOrder.order;
  return response;

};

exports.saveNewOrder = async (req) => {

  let response = constant.RESULT_DEF_201;

  const order = req.body;
  let returnValidate = { wasSuccess: true, messages: [] };
  returnValidate = await orderValidator.validateSaveNewOrder(order);

  if (!returnValidate.wasSuccess) {

    response = constant.RESULT_DEF_ERROR_400;
    response.jsonBody = JSON.parse(JSON.stringify(returnValidate.messages));
    return response;

  }

  const resultUserData = await jwtService.getUserDataReq(req);

  if (!resultUserData.wasSuccess) {

    response = constant.RESULT_DEF_ERROR_500;
    response.error = resultUserData.error;
    return response;

  }

  const resultFindProduct = await productModel.findProductById(order.idProduct);

  const userData = resultUserData.userDataReq;
  order.idUserRegister = userData.idUserRegister;
  order.idLastUserEdit = userData.idUserRegister;
  order.nmProduct = resultFindProduct.product.nmProduct;
  order.vlMonthPrice = resultFindProduct.product.vlMonthPrice;

  const resultSave = await orderModel.saveNew(order);

  if (!resultSave.wasSuccess) {

    response = constant.RESULT_DEF_ERROR_500;
    response.error = resultSave.error;
    return response;

  }

  response.jsonBody = resultSave.order;

  return response;

};

exports.updateOrder = async (req) => {

  let response = constant.RESULT_DEF_200;

  const order = req.body;
  order.id = req.params.id;
  let returnValidate = { wasSuccess: true, messages: [] };

  returnValidate = await orderValidator.validateUpdateOrder(order);

  if (!returnValidate.wasSuccess) {

    response = constant.RESULT_DEF_ERROR_400;
    response.jsonBody = JSON.parse(JSON.stringify(returnValidate.messages));
    return response;

  }

  const resultUserData = await jwtService.getUserDataReq(req);

  if (!resultUserData.wasSuccess) {

    response = constant.RESULT_DEF_ERROR_500;
    response.error = resultUserData.error;
    return response;

  }

  order.idLastUserEdit = resultUserData.userDataReq.idUserRegister;

  const resultFindProduct = await productModel.findProductById(order.idProduct);

  if (!resultFindProduct.wasSuccess) {

    response = constant.RESULT_DEF_ERROR_500;
    response.error = resultFindProduct.error;
    return response;

  }

  order.nmProduct = resultFindProduct.product.nmProduct;
  order.vlMonthPrice = resultFindProduct.product.vlMonthPrice;

  const resultUpdate = await orderModel.updateOrder(order);

  if (!resultUpdate.wasSuccess) {

    response = constant.RESULT_DEF_ERROR_500;
    response.error = resultUpdate.error;
    return response;

  }

  response.jsonBody = resultUpdate.order;

  return response;

};

exports.findAndCancelOrder = async (req) => {

  let response = constant.RESULT_DEF_200;

  const { id } = req.params;

  if (id === null || id === undefined) {

    response = constant.RESULT_DEF_ERROR_400;
    response.jsonBody = 'id Não informado!';
    return response;

  }

  const resultFind = await orderModel.findOrderByIdOrder(id);

  if (!resultFind.wasSuccess) {

    response = constant.RESULT_DEF_ERROR_500;
    response.error = resultFind.error;
    return response;

  }

  if (resultFind.order === undefined) {

    response = constant.RESULT_DEF_ERROR_404;
    return response;

  }

  const resultUserData = await jwtService.getUserDataReq(req);

  if (!resultUserData.wasSuccess) {

    response = constant.RESULT_DEF_ERROR_500;
    response.error = resultUserData.error;
    return response;

  }

  const userData = resultUserData.userDataReq;
  const resultUpd = await orderModel.cancelOrderByIdOrder(id, userData.idUserRegister);

  if (!resultUpd.wasSuccess) {

    response = constant.RESULT_DEF_ERROR_500;
    response.error = resultUpd.error;
    return response;

  }

  response.jsonBody = constant.HTTP_MSG_DEF_200_DELETE;
  return response;

};