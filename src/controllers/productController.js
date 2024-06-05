import repository from '../database/repositories/mongodb/ProductRepository';
import LogEvent from '../entities/LogEvent';
import { saveLogRequest } from '../services/loggerServices';
import { INTERNAL_SERVER_ERROR, RESOURCE_NOT_FOUND } from '../constants/errorMessages';

const findAll = async (req) => {
  const logEvent = new LogEvent('ProductController.findAll');

  try {
    const resultDb = await repository.findAll(req.LogRequest);
    logEvent.messages.push(`resultDb: ${resultDb}`);

    if (resultDb) {
      req.LogRequest.status_code = 200;
      req.LogRequest.output_resquest = {
        request_id: req.LogRequest.request_id,
        products: resultDb,
      };
    } else {
      req.LogRequest.status_code = 404;
      req.LogRequest.output_resquest = {
        request_id: req.LogRequest.request_id,
        messages: [RESOURCE_NOT_FOUND],
      };
    }
  } catch (error) {
    logEvent.was_error = true;
    req.LogRequest.status_code = 500;
    req.LogRequest.output_resquest = {
      request_id: req.LogRequest.request_id,
      messages: [INTERNAL_SERVER_ERROR],
    };
  }
  logEvent.setDtFinish();
  req.LogRequest.events.push(logEvent);
};

const findById = async (req, id) => {
  const logEvent = new LogEvent('ProductController.findById');
  logEvent.messages.push(`id: ${id}`);

  try {
    const resultDb = await repository.findByIdProduct(req.LogRequest, id);
    logEvent.messages.push(`resultDb: ${resultDb}`);

    if (resultDb) {
      req.LogRequest.status_code = 200;
      req.LogRequest.output_resquest = {
        request_id: req.LogRequest.request_id,
        product: resultDb,
      };
    } else {
      req.LogRequest.status_code = 404;
      req.LogRequest.output_resquest = {
        request_id: req.LogRequest.request_id,
        messages: [RESOURCE_NOT_FOUND],
      };
    }
  } catch (error) {
    logEvent.was_error = true;
    req.LogRequest.status_code = 500;
    req.LogRequest.output_resquest = {
      request_id: req.LogRequest.request_id,
      messages: [INTERNAL_SERVER_ERROR],
    };
  }

  logEvent.setDtFinish();
  req.LogRequest.events.push(logEvent);
};

export default async function productFind(req, res) {
  const { id } = req.query;

  if (id) {
    await findById(req, id);
  } else {
    await findAll(req);
  }

  await saveLogRequest(req, res);
  return res.status(req.LogRequest.status_code).json(req.LogRequest.output_resquest);
}
