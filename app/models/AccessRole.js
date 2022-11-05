const mongoose = require('mongoose');

const AccessRole = mongoose.model('accessRoles', {
  idUser: {
    type: Number, min: 2, required: true,
  },
  post: { type: Boolean, default: false },
  update: { type: Boolean, default: false },
  read: { type: Boolean, default: false },
  delete: { type: Boolean, default: false },
  endpoint: { type: String, required: true },
  nmCollection: { type: String, required: true },
}, 'accessRoles');

module.exports = AccessRole;