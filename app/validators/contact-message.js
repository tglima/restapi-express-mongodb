const validators = require('../helpers/validators');
const appConfig = require('../config/app.config');

exports.validateSaveMessage = async (message) => {

  const returnValidate = { wasSuccess: true, messages: [] };
  const nuPhoneFull = message.deTelephone;

  if (!validators.isValidName(message.nmContact)) {

    returnValidate.messages.push('Nome inválido!');
    returnValidate.wasSuccess = false;

  }

  if (!validators.hasValue(message.deMessage)
      || message.deMessage.trim().length < appConfig.qtMinCharMessage) {

    returnValidate.messages.push(`Obrigatório informar uma mensagem com pelo menos ${appConfig.qtMinCharMessage} caracteres!`);
    returnValidate.wasSuccess = false;

  }

  if (validators.hasValue(message.deEmail)
    && !validators.isValidEmail(message.deEmail)) {

    returnValidate.messages.push('O e-mail informado é inválidos!');
    returnValidate.wasSuccess = false;

  }

  if (!validators.hasValue(message.deEmail)
      && !validators.hasValue(nuPhoneFull)) {

    returnValidate.messages.push('Obrigatório informar o E-mail, ou DDD e Telefone');
    returnValidate.wasSuccess = false;

  }

  if (validators.hasValue(nuPhoneFull)) {

    if (nuPhoneFull.length < 10 || nuPhoneFull.length > 11) {

      returnValidate.messages.push('O número de telefone informado é inválido!');
      returnValidate.wasSuccess = false;
      return returnValidate;

    }

    const nuDDD = nuPhoneFull.substring(0, 2);
    const nuPhone = nuPhoneFull.substring(2);

    if (!validators.isValidDDD(nuDDD)) {

      returnValidate.messages.push('O número de DDD informado é inválido!');
      returnValidate.wasSuccess = false;

    }

    if (!validators.isValidPhoneNumber(nuPhone)) {

      returnValidate.messages.push('O número de telefone informado é inválido!');
      returnValidate.wasSuccess = false;

    }

  }

  return returnValidate;

};