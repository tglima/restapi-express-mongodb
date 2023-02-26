import { Router } from 'express';
import Constants from '../app/utils/constants.util';
import util from '../app/utils/util';

const router = Router();

const getHealthCheck = async (req, res) => {
  const dtStart = new Date().toJSON();
  await util.saveLogDB(req, req, dtStart);
  return res.status(200).send(Constants.OK);
};

router.get('/healthcheck', getHealthCheck);

export default router;
