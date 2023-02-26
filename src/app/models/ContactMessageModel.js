import { model, Schema } from 'mongoose';
import ReturnDTO from '../DTOs/ReturnDTO';

const schema = new Schema(
  {
    nmContact: { type: String, required: true },
    dtRegister: { type: Date, default: new Date().toJSON() },
    deEmail: String,
    deTelephone: String,
    deMessage: { type: String, required: true },
    wasRead: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { versionKey: false }
);

const dbModel = model('contactMessages', schema, 'contactMessages');

class ContactMessage {
  async saveNew(contactMessage) {
    const returnDTO = new ReturnDTO(0, false, undefined);
    try {
      returnDTO.jsonBody = await dbModel.create(contactMessage);
      returnDTO.wasSuccess = true;
      returnDTO.jsonBody =
        returnDTO.jsonBody === null ? undefined : returnDTO.jsonBody;
    } catch (error) {
      returnDTO.jsonBody = undefined;
      returnDTO.wasSuccess = false;
      returnDTO.error = error;
    }

    return returnDTO;
  }
}

export default new ContactMessage();
