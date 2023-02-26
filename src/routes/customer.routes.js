import { Router } from 'express';
import Controller from '../app/controllers/CustomerController';

const router = Router();

router.post('/save', Controller.saveCustomer);
router.put('/update/id=:id', Controller.updateCustomer);
router.get('/find/id=:id', Controller.findById);
router.get('/find/nuDocument=:nuDocument', Controller.findByNuDocument);

export default router;
