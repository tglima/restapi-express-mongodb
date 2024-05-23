import express from 'express';

const router = express.Router();

router.get('/health-check', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API IS UP!',
  });
});

export default router;
