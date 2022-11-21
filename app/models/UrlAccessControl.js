const mongoose = require('mongoose');
const schema = new mongoose.Schema(
  {
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
  },
);

const URLAccessControl = mongoose.model('urlAccessControl', schema, 'urlAccessControl');

exports.findByUrlBase = async (urlBase) => {

  const result = { wasSuccess: false, urlAccessControl: undefined, error: null };

  try {

    result.urlAccessControl = await URLAccessControl.findOne({ url: urlBase, isActive: true });
    result.urlAccessControl = result.urlAccessControl === null
      ? undefined : result.urlAccessControl;
    result.wasSuccess = true;

  } catch (error) {

    result.urlAccessControl = undefined;
    result.wasSuccess = false;
    result.error = error;

  }

  return result;

};