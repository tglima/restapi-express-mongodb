const mongoose = require('mongoose');

const User = mongoose.model('users', {
  idUser: {
    type: Number, min: 2, required: true, unique: true,
  },
  nmUser: { type: String, required: true },
  deUserName: { type: String, required: true },
  dePassword: { type: String, required: true },
  dtRegister: { type: Date, default: new Date().toJSON() },
  idRole: { type: Number, min: 2, required: true },
  isActive: { type: Boolean, default: true },
});

module.exports = User;