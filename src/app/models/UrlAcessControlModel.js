import { model, Schema } from 'mongoose';
import ReturnDTO from '../DTOs/ReturnDTO';

const schema = new Schema({
  url: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  post: {
    idRolesAllowed: {
      type: Array,
      required: true,
      default: [],
    },
  },
  update: {
    idRolesAllowed: {
      type: Array,
      required: true,
      default: [],
    },
  },
  read: {
    idRolesAllowed: {
      type: Array,
      required: true,
      default: [],
    },
  },
  delete: {
    idRolesAllowed: {
      type: Array,
      required: true,
      default: [],
    },
  },
});

const dbModel = model('urlAccessControl', schema, 'urlAccessControl');

class UrlAccessControl {
  async findByUrlBase(urlBase) {
    const returnDTO = new ReturnDTO(0, false, undefined);

    try {
      returnDTO.jsonBody = await dbModel.findOne({
        url: urlBase,
        isActive: true,
      });

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

export default new UrlAccessControl();
