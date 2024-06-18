import { Router } from 'express';
import { find as customerFind } from '../controllers/customerController';

const router = Router();

router.get('/', customerFind);

export default router;
