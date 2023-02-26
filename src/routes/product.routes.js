import { Router } from 'express';
import Controller from '../app/controllers/ProductController';

const router = Router();
router.get('/find', Controller.findAll);
router.get('/find/id=:id', Controller.findById);

export default router;
