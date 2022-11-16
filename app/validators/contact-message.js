const validators = require('../helpers/validators');

exports.validateSaveMessage = async (message) => {

  const returnValidate = { wasSuccess: true, messages: [] };
  const nuPhoneFull = message.deTelephone;

  if (!validators.IsValidName(message.nmContact)) {

    returnValidate.messages.push('Nome inválido!');
    returnValidate.wasSuccess = false;

  }

  if (!validators.HasValue(message.deMessage) || message.deMessage.trim().length < 30) {

    returnValidate.messages.push('Obrigatório informar uma mensagem com pelo menos 30 caracteres!');
    returnValidate.wasSuccess = false;

  }

  if (validators.HasValue(message.deEmail)
    && !validators.IsValidEmail(message.deEmail)) {

    returnValidate.messages.push('O e-mail informado é inválidos!');
    returnValidate.wasSuccess = false;

  }

  if (nuPhoneFull.length < 10 || nuPhoneFull.length > 11) {

    returnValidate.messages.push('O número de telefone informado é inválido!');
    returnValidate.wasSuccess = false;
    return returnValidate;

  }

  const nuDDD = nuPhoneFull.substring(0, 2);
  const nuPhone = nuPhoneFull.substring(2);

  if (!validators.IsValidDDD(nuDDD)) {

    returnValidate.messages.push('O número de DDD informado é inválido!');
    returnValidate.wasSuccess = false;

  }

  if (!validators.IsValidPhoneNumber(nuPhone)) {

    returnValidate.messages.push('O número de telefone informado é inválido!');
    returnValidate.wasSuccess = false;

  }

  if (!validators.HasValue(message.deEmail)
      && !validators.HasValue(nuPhoneFull)) {

    returnValidate.messages.push('Obrigatório informar o E-mail, ou DDD e Telefone');
    returnValidate.wasSuccess = false;

  }

  return returnValidate;

};