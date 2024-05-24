import express from 'express';
import { RESOURCE_NOT_FOUND } from '../messages/error-messages';

const router = express.Router();

router.get('/health-check', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API IS UP!',
  });
});

router.use((req, res, next) => {
  res.status(404).json({ messages: [RESOURCE_NOT_FOUND] });
});

export default router;
