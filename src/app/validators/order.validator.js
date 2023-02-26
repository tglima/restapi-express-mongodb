import ReturnDTO from '../DTOs/ReturnDTO';
import Customer from '../models/CustomerModel';
import Order from '../models/OrderModel';
import Product from '../models/ProductModel';
import Constants from '../utils/constants.util';
import validator from './validator';

const msgIdNotFill = 'Não foi informado o ID';
const msgItemNotFound = 'Não foi possível localizar o';
const msgCustomerHasProduct = 'O cliente atual já possui um plano ativo!';
const msgOrderNotFoundAlt =
  'A venda informada não foi encontrada ou não pertence ao cliente informado!';
const msgErrorUpdOrder =
  'Não é possível atualizar uma venda utilizando o mesmo produto já pertence a ela!';

const validateSaveOrder = async (order) => {
  const returnDTO = new ReturnDTO(0, true, []);
  const dateNow = new Date().toJSON();

  if (!validator.hasValue(order.idCustomer)) {
    returnDTO.jsonBody.push(`${msgIdNotFill} do cliente!`);
    returnDTO.wasSuccess = false;
  }

  if (!validator.hasValue(order.idProduct)) {
    returnDTO.jsonBody.push(`${msgIdNotFill} do produto!`);
    returnDTO.wasSuccess = false;
  }

  if (
    !validator.isValidDate(order.dtStart) ||
    (validator.isValidDate(order.dtStart) && order.dtStart < dateNow)
  ) {
    returnDTO.jsonBody.push(Constants.MsgInvalidDate);
    returnDTO.wasSuccess = false;
  }

  if (!returnDTO.wasSuccess) {
    return returnDTO;
  }

  const resultFindCustomer = await Customer.findByIdCustomer(order.idCustomer);

  if (
    !resultFindCustomer.wasSuccess ||
    resultFindCustomer.jsonBody === undefined
  ) {
    returnDTO.jsonBody.push(`${msgItemNotFound} o cliente informado!`);
    returnDTO.wasSuccess = false;
    return returnDTO;
  }

  const resultFindProduct = await Product.findProductById(order.idProduct);

  if (
    !resultFindProduct.wasSuccess ||
    resultFindProduct.jsonBody === undefined
  ) {
    returnDTO.jsonBody.push(`${msgItemNotFound} o produto informado!`);
    returnDTO.wasSuccess = false;
    return returnDTO;
  }

  return returnDTO;
};

class OrderValidator {
  async validateSaveNewOrder(order) {
    const returnDTO = new ReturnDTO(0, true, []);
    const resultValidate = await validateSaveOrder(order);

    if (!resultValidate.wasSuccess) {
      return resultValidate;
    }

    const resultFindOrder = await Order.findOrderByIdCustomer(order.idCustomer);

    if (!resultFindOrder.wasSuccess) {
      returnDTO.jsonBody.push(Constants.MsgStatus400);
      returnDTO.wasSuccess = false;
      return returnDTO;
    }

    if (resultFindOrder.wasSuccess && resultFindOrder.order !== undefined) {
      returnDTO.jsonBody.push(msgCustomerHasProduct);
      returnDTO.wasSuccess = false;
      return returnDTO;
    }

    return returnDTO;
  }

  async validateUpdateOrder(order) {
    const returnDTO = new ReturnDTO(0, true, []);

    if (!validator.hasValue(order.id)) {
      returnDTO.jsonBody.push(`${msgIdNotFill} da venda!`);
      returnDTO.wasSuccess = false;
      return returnDTO;
    }

    const resultValidate = await validateSaveOrder(order);

    if (!resultValidate.wasSuccess) {
      return resultValidate;
    }

    const resultFindOrder = await Order.findOrderByIdCustomer(order.idCustomer);

    if (!resultFindOrder.wasSuccess) {
      returnDTO.jsonBody.push(Constants.MsgStatus400);
      returnDTO.wasSuccess = false;
      return returnDTO;
    }

    if (
      resultFindOrder.jsonBody === undefined ||
      resultFindOrder.jsonBody.id !== order.id
    ) {
      returnDTO.jsonBody.push(msgOrderNotFoundAlt);
      returnDTO.wasSuccess = false;
      return returnDTO;
    }

    if (resultFindOrder.jsonBody.idProduct === order.idProduct) {
      returnDTO.jsonBody.push(msgErrorUpdOrder);
      returnDTO.wasSuccess = false;
      return returnDTO;
    }

    return returnDTO;
  }
}

export default new OrderValidator();
