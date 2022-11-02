const mongoose = require('mongoose');

const Customer = mongoose.model('customers', {
  nmCustomer: { type: String, required: true },
  deGender: { type: String, enum: ['F', 'M'], required: true },
  dtBirth: { type: Date, required: true },
  nuDocument: { type: String, required: true },
  deEmail: String,
  nuDDD: String,
  nuPhone: String,
  idUserRegister: { type: Number, required: true, min: 2 },
  dtRegister: { type: Date, default: new Date().toJSON() },
  isActive: { type: Boolean, default: true },
});

module.exports = Customer;