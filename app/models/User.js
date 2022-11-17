const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    idUser: {
      type: Number, min: 2, required: true, unique: true,
    },
    nmUser: { type: String, required: true },
    deUserName: { type: String, required: true },
    dePassword: { type: String, required: true },
    dtRegister: { type: Date, default: new Date().toJSON() },
    idRole: { type: Number, min: 2, required: true },
    isActive: { type: Boolean, default: true },
  },
);

const User = mongoose.model('users', schema);

exports.findByUsernameAndPass = async (username, password) => {

  const result = { wasSuccess: false, user: null, error: null };

  try {

    result.user = await User.findOne(
      {
        deUserName: username,
        dePassword: password,
        isActive: true,
      },
    );

    result.wasSuccess = true;

  } catch (error) {

    result.user = null;
    result.wasSuccess = false;
    result.error = error;

  }

  return result;

};