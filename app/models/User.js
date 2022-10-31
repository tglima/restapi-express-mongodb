const mongoose = require('mongoose');

const User = mongoose.model('users', {
  idUser: Number,
  nmUser: String,
  deUserName: String,
  dePassword: String,
  dtRegister: Date,
  idRole: Number,
  isActive: Boolean,
});

module.exports = User;