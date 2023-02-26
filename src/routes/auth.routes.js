import { Router } from 'express';
import Controller from '../app/controllers/AuthController';

const router = Router();
router.post('/auth', Controller.auth);

export default router;
