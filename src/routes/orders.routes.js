import { Router } from 'express';
import { find, save, updatePaymentStatus } from '../controllers/orderController';

const router = Router();

router.get('/', find);

router.post('/', save);

router.patch('/id_order=:id_order/payment-status', updatePaymentStatus);
export default router;
