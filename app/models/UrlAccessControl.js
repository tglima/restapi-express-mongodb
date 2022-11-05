const mongoose = require('mongoose');

const URLAccessControl = mongoose.model('urlAccessControl', {
  url: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  post: {
    idRolesAllowed: {
      type: Array,
      required: true,
      default: [],
    },
  },
  update: {
    idRolesAllowed: {
      type: Array,
      required: true,
      default: [],
    },
  },
  read: {
    idRolesAllowed: {
      type: Array,
      required: true,
      default: [],
    },
  },
  delete: {
    idRolesAllowed: {
      type: Array,
      required: true,
      default: [],
    },
  },
}, 'urlAccessControl');

module.exports = URLAccessControl;