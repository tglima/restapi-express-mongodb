const mongoose = require('mongoose');

const schema = new mongoose.Schema(
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
  { versionKey: false },
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

const Customer = mongoose.model('customers', schema);

module.exports = Customer;