import { Router } from 'express';
import AuthRoutes from './auth.routes';
import ContactMessageRoutes from './contactMessage.routes';
import CustomerRoutes from './customer.routes';
import DefaultRoutes from './default.routes';
import HealthRoutes from './health.routes';
import OrderRoutes from './order.routes';
import ProductRoutes from './product.routes';

const router = Router();

router.use('', AuthRoutes);
router.use('', HealthRoutes);
router.use('/contact', ContactMessageRoutes);
router.use('/customer', CustomerRoutes);
router.use('/product', ProductRoutes);
router.use('/order', OrderRoutes);
router.use('**', DefaultRoutes);
export default router;
