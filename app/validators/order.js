const constant = require('../helpers/constants');
const customerModel = require('../models/Customer');
const productModel = require('../models/Product');
const orderModel = require('../models/Order');
const validators = require('../helpers/validators');

const validateSaveOrder = async (order) => {

  const returnValidate = { wasSuccess: true, messages: [] };
  const dateNow = new Date().toJSON();

  if (order.idCustomer === null || order.idCustomer === undefined) {

    returnValidate.messages.push('Não foi informado o Id do cliente!');
    returnValidate.wasSuccess = false;

  }

  if (order.idProduct === null || order.idProduct === undefined) {

    returnValidate.messages.push('Não foi informado o Id do produto!');
    returnValidate.wasSuccess = false;

  }

  if (!validators.isValidDate(order.dtStart)
      || (validators.isValidDate(order.dtStart)
         && order.dtStart < dateNow)) {

    returnValidate.messages.push('A data informada não é válida!');
    returnValidate.wasSuccess = false;

  }

  if (!returnValidate.wasSuccess) {

    return returnValidate;

  }

  const resultFindCustomer = await customerModel.findByIdCustomer(order.idCustomer);
  if (!resultFindCustomer.wasSuccess
    || resultFindCustomer.customer === undefined) {

    returnValidate.messages.push('Não foi possível localizar o cliente informado!');
    returnValidate.wasSuccess = false;
    return returnValidate;

  }

  const resultFindProduct = await productModel.findProductById(order.idProduct);

  if (!resultFindProduct.wasSuccess
      || resultFindProduct.product === undefined) {

    returnValidate.messages.push('Não foi possível localizar o produto informado!');
    returnValidate.wasSuccess = false;
    return returnValidate;

  }

  return returnValidate;

};

exports.validateSaveNewOrder = async (order) => {

  const returnValidate = { wasSuccess: true, messages: [] };

  const returnValidateSave = await validateSaveOrder(order);

  if (!returnValidateSave.wasSuccess) {

    return returnValidateSave;

  }

  const resultFindOrder = await orderModel.findOrderByIdCustomer(order.idCustomer);
  if (!resultFindOrder.wasSuccess
    || resultFindOrder.order !== undefined) {

    returnValidate.messages.push('O cliente atual já possui um plano ativo!');
    returnValidate.wasSuccess = false;
    return returnValidate;

  }

  return returnValidate;

};

exports.validateUpdateOrder = async (order) => {

  const returnValidate = { wasSuccess: true, messages: [] };

  if (order.id === undefined || order.id === null) {

    returnValidate.messages.push('Não foi informado o Id da venda!');
    returnValidate.wasSuccess = false;
    return returnValidate;

  }

  const returnValidateSave = await validateSaveOrder(order);

  if (!returnValidateSave.wasSuccess) {

    return returnValidateSave;

  }

  const resultFindOrder = await orderModel.findOrderByIdCustomer(order.idCustomer);

  if (!resultFindOrder.wasSuccess) {

    returnValidate.messages.push(constant.HTTP_MSG_ERROR_400);
    returnValidate.wasSuccess = false;
    return returnValidate;

  }

  if (resultFindOrder.order === undefined
      || resultFindOrder.order.id !== order.id) {

    returnValidate.messages.push('A venda informada não foi encontrada ou não pertence ao cliente informado!');
    returnValidate.wasSuccess = false;
    return returnValidate;

  }

  if (resultFindOrder.order.idProduct === order.idProduct) {

    returnValidate.messages.push('Não é possível atualizar uma venda utilizando o mesmo produto já pertence a ela!');
    returnValidate.wasSuccess = false;
    return returnValidate;

  }

  return returnValidate;

};