import repository from '../database/repositories/mongodb/LogRequestRepository';
import LogRequest from '../entities/LogRequest';

const getInputRequest = (req) => {
  return {
    headers: req.headers,
    body: req.body,
    method: req.method,
    params: req.params,
    query: req.query,
    url: req.url,
  };
};

export const startLogRequest = (req, res, next) => {
  const logRequest = new LogRequest();
  logRequest.input_request = getInputRequest(req);
  req.LogRequest = logRequest;
  next();
};

// eslint-disable-next-line no-unused-vars
export const saveLogRequest = async (req, res) => {
  req.LogRequest.setDtFinish();
  await repository.saveLogRequest(req.LogRequest);
};
