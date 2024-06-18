import { Router } from 'express';
import productFind from '../controllers/productController';

const router = Router();

router.get('/', async (req, res) => {
  await productFind(req, res);
});

export default router;
