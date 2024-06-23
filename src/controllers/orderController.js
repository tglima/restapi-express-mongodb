/* eslint-disable no-unused-vars */
import LogEvent from '../entities/LogEvent';
import { saveLogRequest } from '../services/loggerServices';
import repository from '../database/repositories/mongodb/OrderRepository';
import productRepository from '../database/repositories/mongodb/ProductRepository';
import * as errMsgs from '../constants/errorMessages';
import { getCurrentDateTime, getFutureDate } from '../helpers';
import {
  validateFindOrder,
  validateSaveOrder,
  validateUpdatePaymentStatus,
} from '../services/validatorServices';

const updatePaymentStatusDB = async (req) => {
  const logEvent = new LogEvent('orderController.updatePaymentStatusDB');
  const { payment_status } = req.body;
  const { id_order } = req.params;
  const user_id = req.header('api-key');

  logEvent.messages.push(`req.body: ${JSON.stringify(req.body)}`);
  logEvent.messages.push(`user_id: ${JSON.stringify(user_id)}`);

  const orderToUpdate = {
    id_order,
    payment_status,
    last_user_edit: user_id,
    dt_last_edit: getCurrentDateTime(),
  };

  logEvent.messages.push(`orderToUpdate: ${JSON.stringify(orderToUpdate)}`);

  try {
    await repository.updatePaymentStatus(req.LogRequest, orderToUpdate);
    req.LogRequest.status_code = 200;
    req.LogRequest.output_resquest = {
      request_id: req.LogRequest.request_id,
      id_order,
    };
  } catch (error) {
    logEvent.was_error = true;
    req.LogRequest.status_code = 500;
    req.LogRequest.output_resquest = {
      request_id: req.LogRequest.request_id,
      messages: [errMsgs.INTERNAL_SERVER_ERROR],
    };
    logEvent.setDtFinish();
    req.LogRequest.events.push(logEvent);
  }
};

const saveNewOrder = async (req) => {
  const logEvent = new LogEvent('orderController.saveNewOrder');
  const { id_customer, id_product } = req.body;
  const user_id = req.header('api-key');
  logEvent.messages.push(`req.body: ${JSON.stringify(req.body)}`);
  logEvent.messages.push(`user_id: ${JSON.stringify(user_id)}`);
  let product;

  try {
    product = await productRepository.findByIdProduct(req.LogRequest, id_product);
    logEvent.messages.push(`product: ${JSON.stringify(product)}`);
  } catch (error) {
    logEvent.was_error = true;
    req.LogRequest.status_code = 500;
    req.LogRequest.output_resquest = {
      request_id: req.LogRequest.request_id,
      messages: [errMsgs.INTERNAL_SERVER_ERROR],
    };
    logEvent.setDtFinish();
    req.LogRequest.events.push(logEvent);
    return;
  }

  const dt_order = getCurrentDateTime();
  logEvent.messages.push(`id_customer: ${id_customer}, id_product: ${id_product}, dt_order: ${dt_order}`);
  const newOrder = {
    id_customer,
    product,
    dt_register: dt_order,
    dt_last_edit: dt_order,
    user_register: user_id,
    last_user_edit: user_id,
    dt_start: dt_order,
    dt_finish: getFutureDate('365'),
    payment_status: 'PENDING',
    is_active: true,
  };

  logEvent.messages.push(`newOrder: ${JSON.stringify(newOrder)}`);

  try {
    const id_order = await repository.saveOrder(req.LogRequest, newOrder);
    logEvent.messages.push(`id_order: ${id_order}`);
    req.LogRequest.status_code = 201;
    req.LogRequest.output_resquest = {
      request_id: req.LogRequest.request_id,
      id_order,
    };
  } catch (error) {
    logEvent.was_error = true;
    req.LogRequest.status_code = 500;
    req.LogRequest.output_resquest = {
      request_id: req.LogRequest.request_id,
      messages: [errMsgs.INTERNAL_SERVER_ERROR],
    };
  }

  logEvent.setDtFinish();
  req.LogRequest.events.push(logEvent);
};

const findById = async (req, id) => {
  const logEvent = new LogEvent('orderController.findById');
  logEvent.messages.push(`id: ${id}`);

  try {
    const orderFound = await repository.findOrderByIdOrder(req.LogRequest, id);
    logEvent.messages.push(`orderFound: ${orderFound}`);

    if (orderFound) {
      req.LogRequest.status_code = 200;
      req.LogRequest.output_resquest = {
        request_id: req.LogRequest.request_id,
        order: orderFound,
      };
    } else {
      req.LogRequest.status_code = 404;
      req.LogRequest.output_resquest = {
        request_id: req.LogRequest.request_id,
        messages: [errMsgs.RESOURCE_NOT_FOUND],
      };
    }
  } catch (error) {
    logEvent.was_error = true;
    req.LogRequest.status_code = 500;
    req.LogRequest.output_resquest = {
      request_id: req.LogRequest.request_id,
      messages: [errMsgs.INTERNAL_SERVER_ERROR],
    };
  }

  logEvent.setDtFinish();
  req.LogRequest.events.push(logEvent);
};

const findByIdCustomer = async (req, id_customer) => {
  const logEvent = new LogEvent('orderController.findByIdCustomer');
  logEvent.messages.push(`id_customer: ${id_customer}`);

  try {
    const orderFound = await repository.findOrderByIdCustomer(req.LogRequest, id_customer);
    logEvent.messages.push(`orderFound: ${orderFound}`);

    if (orderFound.length > 0) {
      req.LogRequest.status_code = 200;
      req.LogRequest.output_resquest = {
        request_id: req.LogRequest.request_id,
        orders: orderFound,
      };
    } else {
      req.LogRequest.status_code = 404;
      req.LogRequest.output_resquest = {
        request_id: req.LogRequest.request_id,
        messages: [errMsgs.RESOURCE_NOT_FOUND],
      };
    }
  } catch (error) {
    logEvent.was_error = true;
    req.LogRequest.status_code = 500;
    req.LogRequest.output_resquest = {
      request_id: req.LogRequest.request_id,
      messages: [errMsgs.INTERNAL_SERVER_ERROR],
    };
  }

  logEvent.setDtFinish();
  req.LogRequest.events.push(logEvent);
};

const findByNuDocument = async (req, nu_document) => {
  const logEvent = new LogEvent('orderController.findByIdCustomer');
  logEvent.messages.push(`nu_document: ${nu_document}`);

  try {
    const orderFound = await repository.findOrderByNuDocument(req.LogRequest, nu_document);
    logEvent.messages.push(`orderFound: ${orderFound}`);

    if (orderFound.length > 0) {
      req.LogRequest.status_code = 200;
      req.LogRequest.output_resquest = {
        request_id: req.LogRequest.request_id,
        orders: orderFound,
      };
    } else {
      req.LogRequest.status_code = 404;
      req.LogRequest.output_resquest = {
        request_id: req.LogRequest.request_id,
        messages: [errMsgs.RESOURCE_NOT_FOUND],
      };
    }
  } catch (error) {
    logEvent.was_error = true;
    req.LogRequest.status_code = 500;
    req.LogRequest.output_resquest = {
      request_id: req.LogRequest.request_id,
      messages: [errMsgs.INTERNAL_SERVER_ERROR],
    };
  }

  logEvent.setDtFinish();
  req.LogRequest.events.push(logEvent);
};

export const save = async (req, res) => {
  const resultSaveOrderDTO = await validateSaveOrder(req);

  if (resultSaveOrderDTO.isValid) {
    await saveNewOrder(req);
  } else {
    req.LogRequest.status_code = 400;
    resultSaveOrderDTO.messages.unshift(errMsgs.BAD_REQUEST);
    req.LogRequest.output_resquest = {
      request_id: req.LogRequest.request_id,
      messages: resultSaveOrderDTO.messages,
    };
  }
  await saveLogRequest(req, res);
  return res.status(req.LogRequest.status_code).json(req.LogRequest.output_resquest);
};

export const find = async (req, res) => {
  if (validateFindOrder(req.LogRequest, req.query)) {
    const { id, nu_document, id_customer } = req.query;

    if (id) {
      await findById(req, id);
    } else if (nu_document) {
      await findByNuDocument(req, nu_document);
    } else if (id_customer) {
      await findByIdCustomer(req, id_customer);
    }
    //
  } else {
    req.LogRequest.status_code = 400;
    req.LogRequest.output_resquest = {
      request_id: req.LogRequest.request_id,
      messages: [errMsgs.BAD_REQUEST],
    };
  }

  await saveLogRequest(req, res);
  return res.status(req.LogRequest.status_code).json(req.LogRequest.output_resquest);
};

export const updatePaymentStatus = async (req, res) => {
  const resultValUpdPaymentDTO = await validateUpdatePaymentStatus(req);
  if (resultValUpdPaymentDTO.isValid) {
    await updatePaymentStatusDB(req);
  } else {
    req.LogRequest.status_code = 400;
    resultValUpdPaymentDTO.messages.unshift(errMsgs.BAD_REQUEST);
    req.LogRequest.output_resquest = {
      request_id: req.LogRequest.request_id,
      messages: resultValUpdPaymentDTO.messages,
    };
  }
  await saveLogRequest(req, res);
  return res.status(req.LogRequest.status_code).json(req.LogRequest.output_resquest);
};
