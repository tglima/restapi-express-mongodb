import moment from 'moment';
import { GetApiKeys } from './configServices';
import { UNAUTHORIZED_MSG } from '../constants/errorMessages';
import { UNAUTHORIZED_STATUS } from '../constants/httpStatus';
import { saveLogRequest } from './loggerServices';
import LogEvent from '../entities/LogEvent';

const checkIsPublicRoute = (urlBase) => {
  const publicRoutes = ['/swagger', '/health-check', '/favicon'];
  return urlBase === '/' || publicRoutes.some((route) => urlBase.includes(route));
};

const validateApiKey = async (apiKey) => {
  const validKeys = await GetApiKeys();
  return validKeys.includes(apiKey);
};

const validateMustContinueRequest = async (req) => {
  const logEvent = new LogEvent('validateMustContinueRequest');

  let urlBase = req.originalUrl;
  urlBase = urlBase.replace('/api', '');

  // Feito desta forma para evitar que o valor fique como undefined
  const apiKey = !req.header('api-key') ? '' : req.header('api-key');

  const mustContinueRequest = checkIsPublicRoute(urlBase) || (await validateApiKey(apiKey));

  logEvent.messages.push(`apiKey: ${apiKey}`);
  logEvent.messages.push(`mustContinueRequest: ${mustContinueRequest}`);

  req.LogRequest.key = apiKey;
  req.LogRequest.url_base = urlBase;
  logEvent.dt_finish = moment().toISOString();
  req.LogRequest.events.push(logEvent);

  return mustContinueRequest;
};

export const checkAuth = async (req, res, next) => {
  const logEvent = new LogEvent('checkAuth');

  const mustContinueRequest = await validateMustContinueRequest(req);

  if (!mustContinueRequest) {
    logEvent.messages.push('info: invalid apiKey');
    const messages = [UNAUTHORIZED_MSG];
    const bodyResponse = { request_id: req.LogRequest.request_id, messages };
    req.LogRequest.output_resquest = bodyResponse;
    logEvent.dt_finish = moment().toISOString();
    req.LogRequest.events.push(logEvent);
    res.status(UNAUTHORIZED_STATUS).json(bodyResponse);
    saveLogRequest(req, res);
    return;
  }

  logEvent.dt_finish = moment().toISOString();
  req.LogRequest.events.push(logEvent);
  next();
};

export const validateUser = () => {
  return true;
};
