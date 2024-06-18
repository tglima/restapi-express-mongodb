import { Router } from 'express';
import { find as orderFind, save as orderSave } from '../controllers/orderController';

const router = Router();

router.get('/', orderFind);

router.post('/', orderSave);

export default router;
