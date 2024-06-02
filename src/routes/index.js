import express from 'express';
import ResponseAPI from '../entities/ResponseApi';
import { saveLogRequest } from '../services/loggerServices';
import { RESOURCE_NOT_FOUND } from '../constants/errorMessages';
import { NOT_FOUND_STATUS, OK_STATUS } from '../constants/httpStatus';

const router = express.Router();

router.get('/health-check', (req, res) => {
  res.status(OK_STATUS).json({
    messages: ['OK'],
  });
});

router.use((req, res, next) => {
  const bodyResponse = new ResponseAPI(req.LogRequest.request_id, [RESOURCE_NOT_FOUND]);
  res.status(NOT_FOUND_STATUS).json(bodyResponse);
  req.LogRequest.output_resquest = bodyResponse;
  saveLogRequest(req, res);
});

export default router;
