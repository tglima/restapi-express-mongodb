const mongoose = require('mongoose');

const schema = new mongoose.Schema(
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
  { versionKey: false },
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

const Product = mongoose.model('products', schema);

exports.findAllProducts = async () => {
  const result = { wasSuccess: false, products: undefined, error: undefined };

  try {
    result.products = await Product.find({ isActive: true });
    result.products = result.products === null ? undefined : result.products;
    result.wasSuccess = true;
  } catch (error) {
    result.products = undefined;
    result.wasSuccess = false;
    result.error = error;
  }

  return result;
};

exports.findProductById = async (idProduct) => {
  const result = { wasSuccess: false, product: null, error: undefined };
  try {
    result.product = await Product.findOne({ _id: idProduct, isActive: true });
    result.product = result.product === null ? undefined : result.product;
    result.wasSuccess = true;
  } catch (error) {
    result.product = null;
    result.wasSuccess = false;
    result.error = error;
  }

  return result;
};
