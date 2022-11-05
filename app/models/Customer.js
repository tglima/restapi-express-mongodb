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
    idUserRegister: { type: Number, required: true, min: 1 },
    dtRegister: { type: Date, default: new Date().toJSON() },
    isActive: { type: Boolean, default: true },
  },
  { versionKey: false },
);

schema.methods.toJSON = function toJSON() {

  const obj = this.toObject();
  delete obj.dtRegister;
  delete obj.isActive;
  delete obj.idUserRegister;
  return obj;

};

const Customer = mongoose.model('customers', schema);

module.exports = Customer;