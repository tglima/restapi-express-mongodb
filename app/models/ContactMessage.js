const mongoose = require('mongoose');

const ContactMessage = mongoose.model('contactMessages', {
  nmContact: { type: String, required: true },
  dtRegister: { type: Date, default: new Date().toJSON() },
  deEmail: String,
  deTelephone: String,
  deMessage: { type: String, required: true },
  wasRead: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, 'contactMessages');

module.exports = ContactMessage;