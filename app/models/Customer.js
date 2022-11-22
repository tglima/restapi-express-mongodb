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

exports.findByNuDocument = async (nuDoc) => {

  const result = { wasSuccess: false, customer: undefined, error: undefined };

  try {

    result.customer = await Customer.findOne({ isActive: true, nuDocument: nuDoc });
    result.customer = result.customer === null ? undefined : result.customer;
    result.wasSuccess = true;

  } catch (error) {

    result.customer = undefined;
    result.wasSuccess = false;
    result.error = error;

  }

  return result;

};

exports.findByIdCustomer = async (id) => {

  const result = { wasSuccess: false, customer: undefined, error: undefined };

  try {

    result.customer = await Customer.findOne({ _id: id, isActive: true });
    result.customer = result.customer === null ? undefined : result.customer;
    result.wasSuccess = true;

  } catch (error) {

    result.customer = undefined;
    result.wasSuccess = false;
    result.error = error;

  }

  return result;

};

exports.saveNew = async (customer) => {

  const result = { wasSuccess: false, customer: undefined, error: undefined };

  try {

    result.customer = await Customer.create(customer);
    result.customer = result.customer === null ? undefined : result.customer;
    result.wasSuccess = true;

  } catch (error) {

    result.customer = undefined;
    result.wasSuccess = false;
    result.error = error;

  }

  return result;

};

exports.updateCustomer = async (customer) => {

  const result = { wasSuccess: false, customer: undefined, error: undefined };

  try {

    result.customer = await Customer.findOneAndUpdate(
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
      },
    );

    result.customer = result.customer === null ? undefined : result.customer;
    result.wasSuccess = true;

  } catch (error) {

    result.customer = undefined;
    result.wasSuccess = false;
    result.error = error;

  }

  return result;

};