import ReturnDTO from '../DTOs/ReturnDTO';
import Customer from '../models/CustomerModel';
import Order from '../models/OrderModel';
import Product from '../models/ProductModel';
import Constants from '../utils/constants.util';
import util from '../utils/util';
import OrderValidator from '../validators/order.validator';
import validator from '../validators/validator';

async function findOrderByNuDocumentCustomer(req) {
  const { nuDocument } = req.params;

  if (!validator.hasValue(nuDocument)) {
    return new ReturnDTO(400, false, Constants.MsgNuDocumentUninformed);
  }

  const resultFindCustomer = await Customer.findByNuDocument(nuDocument);
  if (!resultFindCustomer.wasSuccess) {
    return new ReturnDTO(500, false, Constants.MsgStatus500);
  }

  if (resultFindCustomer.jsonBody === undefined) {
    return new ReturnDTO(404, false, Constants.MsgStatus404);
  }

  const resultFindOrder = await Order.findOrderByIdCustomer(
    resultFindCustomer.jsonBody.id
  );

  if (!resultFindOrder.wasSuccess) {
    return new ReturnDTO(500, false, Constants.MsgStatus500);
  }

  if (resultFindOrder.jsonBody === undefined) {
    return new ReturnDTO(404, false, Constants.MsgStatus404);
  }

  return new ReturnDTO(200, true, resultFindOrder.jsonBody);
}

async function findOrderByIdCustomer(req) {
  const { idCustomer } = req.params;

  if (!validator.hasValue(idCustomer)) {
    return new ReturnDTO(400, false, Constants.MsgIdCustomerUninformed);
  }

  const resultFindOrder = await Order.findOrderByIdCustomer(idCustomer);

  if (!resultFindOrder.wasSuccess) {
    return new ReturnDTO(
      500,
      false,
      Constants.MsgStatus500,
      resultFindOrder.error
    );
  }

  if (resultFindOrder.jsonBody === undefined) {
    return new ReturnDTO(404, false, Constants.MsgStatus404);
  }

  return new ReturnDTO(200, true, resultFindOrder.jsonBody);
}

async function saveNewOrder(req) {
  const order = req.body;
  const returnValidate = await OrderValidator.validateSaveNewOrder(order);

  if (!returnValidate.wasSuccess) {
    return new ReturnDTO(
      400,
      false,
      JSON.parse(JSON.stringify(returnValidate.jsonBody))
    );
  }

  const resultGetUserData = await util.getUserDataReq(req);
  if (!resultGetUserData.wasSuccess) {
    return new ReturnDTO(
      500,
      false,
      Constants.MsgStatus500,
      resultGetUserData.error
    );
  }

  const resultFindProduct = await Product.findProductById(order.idProduct);

  if (!resultFindProduct.wasSuccess) {
    return new ReturnDTO(
      500,
      false,
      Constants.MsgStatus500,
      resultFindProduct.error
    );
  }

  if (!validator.hasValue(resultFindProduct.jsonBody)) {
    return new ReturnDTO(
      500,
      false,
      Constants.MsgStatus500,
      Constants.MsgStatus404
    );
  }

  const userData = resultGetUserData.jsonBody;
  order.idUserRegister = userData.idUserRegister;
  order.idLastUserEdit = userData.idUserRegister;
  order.nmProduct = resultFindProduct.jsonBody.nmProduct;
  order.vlMonthPrice = resultFindProduct.jsonBody.vlMonthPrice;

  const resultSave = await Order.saveNew(order);

  if (!resultSave.wasSuccess) {
    return new ReturnDTO(500, false, Constants.MsgStatus500, resultSave.error);
  }

  return new ReturnDTO(201, true, resultSave.jsonBody);
}

async function updateOrder(req) {
  const order = req.body;
  order.id = req.params.id;
  const returnValidate = await OrderValidator.validateUpdateOrder(order);

  if (!returnValidate.wasSuccess) {
    return new ReturnDTO(
      400,
      false,
      JSON.parse(JSON.stringify(returnValidate.jsonBody))
    );
  }

  const resultGetUserData = await util.getUserDataReq(req);
  if (!resultGetUserData.wasSuccess) {
    return new ReturnDTO(
      500,
      false,
      Constants.MsgStatus500,
      resultGetUserData.error
    );
  }

  const userData = resultGetUserData.jsonBody;
  order.idLastUserEdit = userData.idUserRegister;

  const resultFindProduct = await Product.findProductById(order.idProduct);

  if (!resultFindProduct.wasSuccess) {
    return new ReturnDTO(
      500,
      false,
      Constants.MsgStatus500,
      resultFindProduct.error
    );
  }

  if (!validator.hasValue(resultFindProduct.jsonBody)) {
    return new ReturnDTO(
      500,
      false,
      Constants.MsgStatus500,
      Constants.MsgStatus404
    );
  }

  order.nmProduct = resultFindProduct.jsonBody.nmProduct;
  order.vlMonthPrice = resultFindProduct.jsonBody.vlMonthPrice;

  const resultUpdate = await Order.updateOrder(order);

  if (!resultUpdate.wasSuccess) {
    return new ReturnDTO(
      500,
      false,
      Constants.MsgStatus500,
      resultUpdate.error
    );
  }

  return new ReturnDTO(200, true, resultUpdate.jsonBody);
}

async function findAndCancelOrder(req) {
  const { id } = req.params;

  if (!validator.hasValue(id)) {
    return new ReturnDTO(400, false, Constants.MsgRequiredId);
  }

  const resultFindOrder = await Order.findOrderByIdOrder(id);
  if (!resultFindOrder.wasSuccess) {
    return new ReturnDTO(
      500,
      false,
      Constants.MsgStatus500,
      resultFindOrder.error
    );
  }

  if (!validator.hasValue(resultFindOrder.jsonBody)) {
    return new ReturnDTO(
      404,
      false,
      Constants.MsgStatus500,
      Constants.MsgStatus404
    );
  }

  const resultGetUserData = await util.getUserDataReq(req);
  if (!resultGetUserData.wasSuccess) {
    return new ReturnDTO(
      500,
      false,
      Constants.MsgStatus500,
      resultGetUserData.error
    );
  }

  const userData = resultGetUserData.jsonBody;

  const resultCancelOrder = await Order.cancelOrderByIdOrder(
    id,
    userData.idUserRegister
  );

  if (!resultCancelOrder.wasSuccess) {
    return new ReturnDTO(
      500,
      false,
      Constants.MsgStatus500,
      resultCancelOrder.error
    );
  }

  return new ReturnDTO(200, true, Constants.MsgStatusDeleteSuccess);
}

class OrderController {
  async saveOrder(req, res) {
    const dtStart = new Date().toJSON();

    const response = await saveNewOrder(req);

    await util.saveLogDB(req, response, dtStart);

    return res.status(response.statusCode).send(response.jsonBody);
  }

  async findByNuDocument(req, res) {
    const dtStart = new Date().toJSON();

    const response = await findOrderByNuDocumentCustomer(req);

    await util.saveLogDB(req, response, dtStart);

    return res.status(response.statusCode).send(response.jsonBody);
  }

  async findByIdCustomer(req, res) {
    const dtStart = new Date().toJSON();

    const response = await findOrderByIdCustomer(req);

    await util.saveLogDB(req, response, dtStart);

    return res.status(response.statusCode).send(response.jsonBody);
  }

  async updateOrder(req, res) {
    const dtStart = new Date().toJSON();

    const response = await updateOrder(req);

    await util.saveLogDB(req, response, dtStart);

    return res.status(response.statusCode).send(response.jsonBody);
  }

  async cancelOrder(req, res) {
    const dtStart = new Date().toJSON();

    const response = await findAndCancelOrder(req);

    await util.saveLogDB(req, response, dtStart);

    return res.status(response.statusCode).send(response.jsonBody);
  }
}

export default new OrderController();
