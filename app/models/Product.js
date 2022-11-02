const mongoose = require('mongoose');

const Product = mongoose.model('products', {
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
});

module.exports = Product;