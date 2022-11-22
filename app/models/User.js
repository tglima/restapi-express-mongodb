const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    nmUser: { type: String, required: true },
    deUserName: { type: String, required: true },
    dePassword: { type: String, required: true },
    idRole: { type: Number, min: 2, required: true },
    isActive: { type: Boolean, default: true },
  },
);

schema.methods.toJSON = function toJSON() {

  const userJSON = {};
  const obj = this.toObject();

  userJSON.id = obj.id;
  userJSON.nmUser = obj.nmUser;
  userJSON.deUserName = obj.deUserName;
  userJSON.dePassword = obj.dePassword;
  userJSON.nmProduct = obj.nmProduct;
  userJSON.idRole = obj.idRole;
  userJSON.isActive = obj.isActive;
  return userJSON;

};

const User = mongoose.model('users', schema, 'users');

exports.findByUsernameAndPass = async (username, password) => {

  const result = { wasSuccess: false, user: undefined, error: undefined };

  try {

    result.user = await User.findOne(
      {
        deUserName: username,
        dePassword: password,
        isActive: true,
      },
    );

    result.user = result.user === null ? undefined : result.user;
    result.wasSuccess = true;

  } catch (error) {

    result.user = undefined;
    result.wasSuccess = false;
    result.error = error;

  }

  return result;

};