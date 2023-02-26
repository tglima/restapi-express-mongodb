import { Router } from 'express';
import ReturnDTO from '../app/DTOs/ReturnDTO';
import Constants from '../app/utils/constants.util';
import util from '../app/utils/util';

const router = Router();

const GetResponseDef = async (req, res) => {
  const dtStart = new Date().toJSON();
  const response = new ReturnDTO(404, false, Constants.MsgStatus404);
  await util.saveLogDB(req, response, dtStart);
  return res.status(response.statusCode).send(response.jsonBody);
};

router.get('/', GetResponseDef);
router.post('/', GetResponseDef);
router.put('/', GetResponseDef);
router.delete('/', GetResponseDef);

export default router;
