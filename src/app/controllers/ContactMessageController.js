import ReturnDTO from '../DTOs/ReturnDTO';
import ContactMessage from '../models/ContactMessageModel';
import Constants from '../utils/constants.util';
import util from '../utils/util';
import validator from '../validators/contactMessage.validator';

async function saveMessage(req) {
  let returnDTO = new ReturnDTO(201, true, Constants.MsgStatus201);

  const message = req.body;

  let returnValidate = new ReturnDTO(0, true, []);
  returnValidate = await validator.validateSaveMessage(message);

  if (!returnValidate.wasSuccess) {
    returnDTO = new ReturnDTO(
      400,
      false,
      JSON.parse(JSON.stringify(returnValidate.messages))
    );
    return returnDTO;
  }

  const resultSave = await ContactMessage.saveNew(message);

  if (!resultSave.wasSuccess) {
    returnDTO = new ReturnDTO(500, false, undefined, resultSave.error);
    return returnDTO;
  }

  return returnDTO;
}

class ContactController {
  async save(req, res) {
    const dtStart = new Date().toJSON();
    const response = await saveMessage(req);
    await util.saveLogDB(req, response, dtStart);
    return res.status(response.statusCode).send(response.jsonBody);
  }
}

export default new ContactController();
