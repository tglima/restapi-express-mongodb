import { model, Schema } from 'mongoose';
import ReturnDTO from '../DTOs/ReturnDTO';

const schema = new Schema(
  {
    nmCustomer: { type: String, required: true },
    deGender: { type: String, enum: ['F', 'M'], required: true },
    dtBirth: { type: Date, required: true },
    nuDocument: { type: String, required: true, unique: true },
    deEmail: String,
    nuDDD: String,
    nuPhone: String,
    idUserRegister: { type: String, required: true },
    idLastUserEdit: { type: String, required: true },
    dtRegister: { type: Date, default: new Date().toJSON() },
    dtLastEdit: { type: Date, default: new Date().toJSON() },
    isActive: { type: Boolean, default: true },
  },
  { versionKey: false }
);

schema.methods.toJSON = function toJSON() {
  const customerJSON = {};
  const obj = this.toObject();
  const dtBirth = obj.dtBirth.toISOString().split('T')[0];

  // eslint-disable-next-line no-underscore-dangle
  customerJSON.id = obj._id;
  customerJSON.nmCustomer = obj.nmCustomer;
  customerJSON.dtBirth = dtBirth;
  customerJSON.deGender = obj.deGender;
  customerJSON.nuDocument = obj.nuDocument;
  customerJSON.deEmail = obj.deEmail;
  customerJSON.nuDDD = obj.nuDDD;
  customerJSON.nuPhone = obj.nuPhone;

  return customerJSON;
};

const dbModel = model('customers', schema);

class Customer {
  async findByNuDocument(nuDoc) {
    const returnDTO = new ReturnDTO(0, false, undefined);

    try {
      returnDTO.jsonBody = await dbModel.findOne({
        isActive: true,
        nuDocument: nuDoc,
      });
      returnDTO.wasSuccess = true;
      returnDTO.jsonBody =
        returnDTO.jsonBody === null ? undefined : returnDTO.jsonBody;
    } catch (error) {
      returnDTO.wasSuccess = false;
      returnDTO.jsonBody = undefined;
      returnDTO.error = error;
    }

    return returnDTO;
  }

  async findByIdCustomer(id) {
    const returnDTO = new ReturnDTO(0, false, undefined);
    try {
      returnDTO.jsonBody = await dbModel.findOne({
        _id: id,
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

  async saveNew(customer) {
    const returnDTO = new ReturnDTO(0, false, undefined);

    try {
      returnDTO.jsonBody = await dbModel.create(customer);
      returnDTO.wasSuccess = true;
      returnDTO.jsonBody =
        returnDTO.jsonBody === null ? undefined : returnDTO.jsonBody;
    } catch (error) {
      returnDTO.wasSuccess = false;
      returnDTO.jsonBody = undefined;
      returnDTO.error = error;
    }

    return returnDTO;
  }

  async updateCustomer(customer) {
    const returnDTO = new ReturnDTO(0, false, undefined);

    try {
      returnDTO.jsonBody = await dbModel.findOneAndUpdate(
        { _id: customer.id },
        {
          nmCustomer: customer.nmCustomer,
          deGender: customer.deGender,
          dtBirth: customer.dtBirth,
          nuDocument: customer.nuDocument,
          deEmail: customer.deEmail,
          nuDDD: customer.nuDDD,
          nuPhone: customer.nuPhone,
          idLastUserEdit: customer.idLastUserEdit,
          dtLastEdit: new Date().toJSON(),
        },
        {
          new: true,
        }
      );

      returnDTO.wasSuccess = true;
      returnDTO.jsonBody =
        returnDTO.jsonBody === null ? undefined : returnDTO.jsonBody;
    } catch (error) {
      returnDTO.wasSuccess = false;
      returnDTO.jsonBody = undefined;
      returnDTO.error = error;
    }

    return returnDTO;
  }
}

export default new Customer();
