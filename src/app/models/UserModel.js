import { model, Schema } from 'mongoose';
import ReturnDTO from '../DTOs/ReturnDTO';

const schema = new Schema({
  nmUser: { type: String, required: true },
  deUserName: { type: String, required: true },
  dePassword: { type: String, required: true },
  idRole: { type: Number, min: 2, required: true },
  isActive: { type: Boolean, default: true },
});

schema.methods.toJSON = function toJSON() {
  const userJSON = {};
  const obj = this.toObject();

  userJSON.id = obj.id;
  userJSON.nmUser = obj.nmUser;
  userJSON.deUserName = obj.deUserName;
  userJSON.dePassword = obj.dePassword;
  userJSON.nmProduct = obj.nmProduct;
  userJSON.idRole = obj.idRole;
  userJSON.isActive = obj.isActive;
  return userJSON;
};

const dbModel = model('users', schema, 'users');

class User {
  async findByUsernameAndPass(username, password) {
    const returnDTO = new ReturnDTO(0, false, undefined);

    try {
      returnDTO.jsonBody = await dbModel.findOne({
        deUserName: username,
        dePassword: password,
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

export default new User();
