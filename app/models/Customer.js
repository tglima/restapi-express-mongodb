const mongoose = require('mongoose');

const Customer = mongoose.model('customers', {
  nmCustomer: String,
  deGender: String,
  dtBirth: Date,
  nuDocument: String,
  deEmail: String,
  nuDDD: String,
  nuPhone: String,
  idUserRegister: Number,
  dtRegister: Date,
  isActive: Boolean,
});

module.exports = Customer;