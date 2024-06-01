import express from 'express';
import { RESOURCE_NOT_FOUND } from '../constants/errorMessages';
import { NOT_FOUND_STATUS, OK_STATUS } from '../constants/httpStatus';

const router = express.Router();

router.get('/health-check', (req, res) => {
  res.status(OK_STATUS).json({
    messages: ['OK'],
  });
});

router.use((req, res, next) => {
  res.status(NOT_FOUND_STATUS).json({ messages: [RESOURCE_NOT_FOUND] });
});

export default router;
