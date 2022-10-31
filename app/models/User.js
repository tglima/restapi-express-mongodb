const mongoose = require('mongoose');

const User = mongoose.model('users', {
  IdUser: Number,
  NmUser: String,
  DeUserName: String,
  DePassword: String,
  DtRegister: Date,
  IdRole: Number,
  IsActive: Boolean,
});

module.exports = User;