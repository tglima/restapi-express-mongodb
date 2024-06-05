import LogEvent from '../entities/LogEvent';
import { saveLogRequest } from '../services/loggerServices';
import repository from '../database/repositories/mongodb/CustomerRepository';
import { validateFindCustomer } from '../services/validatorServices';
import * as errMsgs from '../constants/errorMessages';
import * as httpStatus from '../constants/httpStatus';
import { getCurrentEpoch } from '../helpers/index';

const findById = async (req, id) => {
  const logEvent = new LogEvent('ProductController.findAll');
  logEvent.messages.push(`id: ${id}`);

  try {
    const resultDb = await repository.findById(req.LogRequest, id);
    logEvent.messages.push(`resultDb: ${resultDb}`);

    if (resultDb) {
      req.LogRequest.status_code = httpStatus.OK_STATUS;
      req.LogRequest.output_resquest = {
        request_id: req.LogRequest.request_id,
        customer: resultDb,
      };
    } else {
      req.LogRequest.status_code = httpStatus.NOT_FOUND_STATUS;
      req.LogRequest.output_resquest = {
        request_id: req.LogRequest.request_id,
        messages: [errMsgs.RESOURCE_NOT_FOUND],
      };
    }
  } catch (error) {
    logEvent.was_error = true;
    req.LogRequest.status_code = httpStatus.INTERNAL_SERVER_ERROR_STATUS;
    req.LogRequest.output_resquest = {
      request_id: req.LogRequest.request_id,
      messages: [errMsgs.INTERNAL_SERVER_ERROR],
    };
  }

  logEvent.setDtFinish();
  req.LogRequest.events.push(logEvent);
};

const findByNuDocument = async (req, nuDocument) => {
  const logEvent = new LogEvent('ProductController.findAll');
  logEvent.messages.push(`nuDocument: ${nuDocument}`);

  try {
    const resultDb = await repository.findByNuDocument(req.LogRequest, nuDocument);
    logEvent.messages.push(`resultDb: ${resultDb}`);

    if (resultDb) {
      req.LogRequest.status_code = httpStatus.OK_STATUS;
      req.LogRequest.output_resquest = {
        request_id: req.LogRequest.request_id,
        customer: resultDb,
      };
    } else {
      req.LogRequest.status_code = httpStatus.NOT_FOUND_STATUS;
      req.LogRequest.output_resquest = {
        request_id: req.LogRequest.request_id,
        messages: [errMsgs.RESOURCE_NOT_FOUND],
      };
    }
  } catch (error) {
    logEvent.was_error = true;
    req.LogRequest.status_code = httpStatus.INTERNAL_SERVER_ERROR_STATUS;
    req.LogRequest.output_resquest = {
      request_id: req.LogRequest.request_id,
      messages: [errMsgs.INTERNAL_SERVER_ERROR],
    };
  }

  logEvent.setDtFinish();
  req.LogRequest.events.push(logEvent);
};

export const find = async (req, res) => {
  const x = getCurrentEpoch();
  console.log(x);

  if (validateFindCustomer(req.LogRequest, req.query)) {
    const { id, nu_document } = req.query;

    await (id ? findById(req, id) : findByNuDocument(req, nu_document));
    //
  } else {
    req.LogRequest.status_code = httpStatus.BAD_REQUEST_STATUS;
    req.LogRequest.output_resquest = {
      request_id: req.LogRequest.request_id,
      messages: [errMsgs.BAD_REQUEST],
    };
  }

  await saveLogRequest(req, res);
  return res.status(req.LogRequest.status_code).json(req.LogRequest.output_resquest);
};

export const save = async (req, res) => {
  await saveLogRequest(req, res);
  return res.status(req.LogRequest.status_code).json(req.LogRequest.output_resquest);
};

export const update = async (req, res) => {
  await saveLogRequest(req, res);
  return res.status(req.LogRequest.status_code).json(req.LogRequest.output_resquest);
};
