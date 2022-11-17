const validators = require('../helpers/validators');

exports.validateSaveCustomer = async (customer) => {

  const returnValidate = { wasSuccess: true, messages: [] };

  if (!validators.isValidName(customer.nmCustomer)) {

    returnValidate.messages.push('Nome inválido!');
    returnValidate.wasSuccess = false;

  }

  if (!validators.isValidDeGender(customer.deGender)) {

    returnValidate.messages.push('Sexo inválido!');
    returnValidate.wasSuccess = false;

  }

  if (!validators.hasValue(customer.deEmail)
      && !validators.hasValue(customer.nuDDD)
      && !validators.hasValue(customer.nuPhone)) {

    returnValidate.messages.push('Obrigatório informar o E-mail, ou DDD e Telefone');
    returnValidate.wasSuccess = false;
    return returnValidate;

  }

  if (validators.hasValue(customer.nuDDD) && !validators.hasValue(customer.nuPhone)) {

    returnValidate.messages.push('Ao informar o DDD é obrigatório informar o número do telefone!');
    returnValidate.wasSuccess = false;

  }

  if (!validators.hasValue(customer.nuDDD) && validators.hasValue(customer.nuPhone)) {

    returnValidate.messages.push('Ao informar o número do telefone é obrigatório informar o DDD!');
    returnValidate.wasSuccess = false;

  }

  if (validators.hasValue(customer.nuPhone) && validators.hasValue(customer.nuDDD)) {

    if (!validators.isValidPhoneNumber(customer.nuPhone)) {

      returnValidate.messages.push('O número de telefone informado é inválido!');
      returnValidate.wasSuccess = false;

    }

    if (!validators.isValidDDD(customer.nuDDD)) {

      returnValidate.messages.push('O número de telefone informado é inválido!');
      returnValidate.wasSuccess = false;

    }

  }

  if (!validators.isValidEmail(customer.deEmail)) {

    returnValidate.messages.push('O e-mail informado é inválidos!');
    returnValidate.wasSuccess = false;

  }

  if (!validators.isValidDate(customer.dtBirth)) {

    returnValidate.messages.push('A data de nascimento informada é inválida!');
    returnValidate.wasSuccess = false;

  }

  if (validators.isValidDate(customer.dtBirth)
      && !validators.isValidAge(customer.dtBirth)) {

    returnValidate.messages.push('A data de nascimento informada não corresponde a uma idade válida!');
    returnValidate.wasSuccess = false;

  }

  return returnValidate;

};