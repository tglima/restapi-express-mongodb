const mongoose = require('mongoose');

const Product = mongoose.model('products', {
  nmProduct: String,
  vlMonthPrice: { type: Number, min: 0 },
  details: {
    nmVideoQuality: String,
    nmResolution: String,
    qtSimultaneousScreens: Number,
  },
  dtRegister: { type: Date, default: new Date().toJSON() },
  idUserRegister: Number,
  isActive: { type: Boolean, default: true },
});

module.exports = Product;