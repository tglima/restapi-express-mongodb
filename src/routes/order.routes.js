import { Router } from 'express';
import Controller from '../app/controllers/OrderController';

const router = Router();
router.post('/save', Controller.saveOrder);
router.get(
  '/find/customer/nuDocument=:nuDocument',
  Controller.findByNuDocument
);
router.get(
  '/find/customer/idCustomer=:idCustomer',
  Controller.findByIdCustomer
);
router.put('/update/id=:id', Controller.updateOrder);
router.delete('/delete/id=:id', Controller.cancelOrder);
export default router;
