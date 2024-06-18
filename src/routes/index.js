import express from 'express';
import ResponseAPI from '../entities/ResponseApi';
import CustomerRoutes from './customer.routes';
import ProductRoutes from './product.routes';
import OrderRoutes from './orders.routes';
import { saveLogRequest } from '../services/loggerServices';
import { RESOURCE_NOT_FOUND } from '../constants/errorMessages';

const router = express.Router();

router.get('/health-check', (req, res) => {
  res.status(200).json({
    messages: ['OK'],
  });
});

router.use('/products', ProductRoutes);
router.use('/customers', CustomerRoutes);
router.use('/orders', OrderRoutes);

router.use((req, res, next) => {
  const bodyResponse = new ResponseAPI(req.LogRequest.request_id, [RESOURCE_NOT_FOUND]);
  req.LogRequest.status_code = 404;
  res.status(req.LogRequest.status_code).json(bodyResponse);
  req.LogRequest.output_resquest = bodyResponse;
  saveLogRequest(req, res);
});

export default router;
