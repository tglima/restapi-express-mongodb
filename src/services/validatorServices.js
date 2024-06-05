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
  logEvent.setDtFinish();
  req.LogRequest.events.push(logEvent);

  return mustContinueRequest;
};

const validateNuDocument = (nuDocument) => {
  if (!nuDocument) return false;
  const onlyNumbers = nuDocument.replace(/\D/g, '');
  if (onlyNumbers.length !== 11) return false;

  // Check if all digits are the same (invalid CPF)
  const allSameDigits = new Set(onlyNumbers).size === 1;
  if (allSameDigits) {
    return false;
  }

  function digit(partial) {
    const remainder =
      partial
        .map((value, index) => (partial.length + 1 - index) * value)
        .reduce((accumulator, value) => accumulator + value, 0) % 11;

    return remainder < 2 ? 0 : 11 - remainder;
  }

  const numbers = onlyNumbers.split('').map((char) => parseInt(char, 10));

  if (numbers[9] !== digit(numbers.slice(0, 9))) {
    return false;
  }

  if (numbers[10] !== digit(numbers.slice(0, 10))) {
    return false;
  }

  return true;
};

export const checkAuth = async (req, res, next) => {
  const logEvent = new LogEvent('checkAuth');

  const mustContinueRequest = await validateMustContinueRequest(req);

  if (!mustContinueRequest) {
    logEvent.messages.push('info: invalid apiKey');
    const messages = [UNAUTHORIZED_MSG];
    const bodyResponse = { request_id: req.LogRequest.request_id, messages };
    req.LogRequest.output_resquest = bodyResponse;
    logEvent.setDtFinish();
    req.LogRequest.events.push(logEvent);
    res.status(UNAUTHORIZED_STATUS).json(bodyResponse);
    saveLogRequest(req, res);
    return;
  }

  logEvent.setDtFinish();
  req.LogRequest.events.push(logEvent);
  next();
};

export const validateFindCustomer = (logRequest, query) => {
  const logEvent = new LogEvent('validateFindCustomer');
  const { id, nu_document } = query;
  let isValid = Object.keys(query).length === 1 && (id !== undefined || nu_document !== undefined);

  logEvent.messages.push(`query: ${query}`);

  logEvent.messages.push(`query.length: ${Object.keys(query).length}`);

  if (isValid && nu_document && !validateNuDocument(nu_document)) {
    isValid = false;
    logEvent.messages.push('invalid nu_document');
  }

  if (isValid && id && id.length <= 2) {
    isValid = false;
    logEvent.messages.push('invalid id');
  }

  logEvent.messages.push(`isValid: ${isValid}`);
  logEvent.setDtFinish();
  logRequest.events.push(logEvent);
  return isValid;
};
