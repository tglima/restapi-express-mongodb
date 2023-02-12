const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    nmContact: { type: String, required: true },
    dtRegister: { type: Date, default: new Date().toJSON() },
    deEmail: String,
    deTelephone: String,
    deMessage: { type: String, required: true },
    wasRead: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { versionKey: false },
);

const ContactMessage = mongoose.model(
  'contactMessages',
  schema,
  'contactMessages',
);

exports.saveNew = async (contactMessage) => {
  const result = {
    wasSuccess: false,
    contactMessage: undefined,
    error: undefined,
  };

  try {
    result.contactMessage = await ContactMessage.create(contactMessage);
    result.contactMessage =
      result.contactMessage === null ? undefined : result.contactMessage;
    result.wasSuccess = true;
  } catch (error) {
    result.contactMessage = undefined;
    result.wasSuccess = false;
    result.error = error;
  }

  return result;
};
