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
    idUserRegister: { type: Number, min: 2, required: true },
    dtRegister: { type: Date, default: new Date().toJSON() },
    isActive: { type: Boolean, default: true },
  },
  { versionKey: false },
);

schema.methods.toJSON = function toJSON() {

  const prodJSON = {};
  const obj = this.toObject();

  // eslint-disable-next-line no-underscore-dangle
  prodJSON.id = obj._id;
  prodJSON.nmProduct = obj.nmProduct;
  prodJSON.vlMonthPrice = obj.vlMonthPrice;
  prodJSON.nuDocument = obj.nuDocument;
  prodJSON.details = obj.details;

  return prodJSON;

};

const Product = mongoose.model('products', schema);
module.exports = Product;