import { model, Schema } from 'mongoose';
import ReturnDTO from '../DTOs/ReturnDTO';

const schema = new Schema(
  {
    url: { type: String, required: true },
    idUserRegister: { type: String },
    reqHeaders: { type: Object },
    reqParams: { type: Object },
    reqBody: { type: Object },
    reqMethod: { type: String },
    resStatusCode: { type: String },
    resJsonBody: { type: Object },
    error: { type: Object },
    dtStart: { type: Date, default: new Date().toJSON() },
    dtFinish: { type: Date, default: new Date().toJSON() },
  },
  { versionKey: false }
);

const dbModel = model('apiLogs', schema, 'apiLogs');

class APILog {
  async saveNew(log) {
    const returnDTO = new ReturnDTO(0, false, undefined);
    try {
      returnDTO.jsonBody = await dbModel.create(log);
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

export default new APILog();
