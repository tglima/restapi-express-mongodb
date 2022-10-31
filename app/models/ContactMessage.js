const mongoose = require('mongoose');

const ContactMessage = mongoose.model('contactMessages', {
  nmContact: String,
  dtRegister: { type: Date, default: new Date().toJSON() },
  deEmail: String,
  deTelephone: String,
  deMessage: String,
  wasRead: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, 'contactMessages');

module.exports = ContactMessage;