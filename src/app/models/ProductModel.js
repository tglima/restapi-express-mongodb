import { model, Schema } from 'mongoose';
import ReturnDTO from '../DTOs/ReturnDTO';

const schema = new Schema(
  {
    nmProduct: { type: String, required: true },
    vlMonthPrice: { type: Number, min: 0, required: true },
    details: {
      nmVideoQuality: { type: String, required: true },
      nmResolution: { type: String, required: true },
      qtSimultaneousScreens: { type: Number, min: 0, required: true },
    },
    idUserRegister: { type: String, required: true },
    dtRegister: { type: Date, default: new Date().toJSON() },
    isActive: { type: Boolean, default: true },
  },
  { versionKey: false }
);

schema.methods.toJSON = function toJSON() {
  const productJSON = {};
  const obj = this.toObject();

  // eslint-disable-next-line no-underscore-dangle
  productJSON.id = obj._id;
  productJSON.nmProduct = obj.nmProduct;
  productJSON.vlMonthPrice = obj.vlMonthPrice;
  productJSON.nuDocument = obj.nuDocument;
  productJSON.details = obj.details;

  return productJSON;
};

const dbModel = model('products', schema);

class Product {
  async findAllProducts() {
    const returnDTO = new ReturnDTO(0, false, undefined);

    try {
      returnDTO.jsonBody = await dbModel.find({ isActive: true });
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

  async findProductById(idProduct) {
    const returnDTO = new ReturnDTO(0, false, undefined);

    try {
      returnDTO.jsonBody = await dbModel.findOne({
        _id: idProduct,
        isActive: true,
      });
      returnDTO.wasSuccess = true;
      returnDTO.jsonBody =
        returnDTO.jsonBody === null ? undefined : returnDTO.jsonBody;
    } catch (error) {
      returnDTO.jsonBody = null;
      returnDTO.wasSuccess = false;
      returnDTO.error = error;
    }

    return returnDTO;
  }
}

export default new Product();
