import { Router } from 'express';
import Controller from '../app/controllers/ContactMessageController';

const router = Router();
router.post('', Controller.save);

export default router;
