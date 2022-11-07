const validators = require('../helpers/validators');

exports.validateSaveCustomer = async (customer) => {

  const returnValidate = { wasSuccess: true, messages: [] };

  if (!validators.IsValidName(customer.nmCustomer)) {

    returnValidate.messages.push('Nome inválido!');
    returnValidate.wasSuccess = false;

  }

  if (!validators.IsValidDeGender(customer.deGender)) {

    returnValidate.messages.push('Sexo inválido!');
    returnValidate.wasSuccess = false;

  }

  if (!validators.HasValue(customer.deEmail)
      && !validators.HasValue(customer.nuDDD)
      && !validators.HasValue(customer.nuPhone)) {

    returnValidate.messages.push('Obrigatório informar o E-mail, ou DDD e Telefone');
    returnValidate.wasSuccess = false;
    return returnValidate;

  }

  if (validators.HasValue(customer.nuDDD) && !validators.HasValue(customer.nuPhone)) {

    returnValidate.messages.push('Ao informar o DDD é obrigatório informar o número do telefone!');
    returnValidate.wasSuccess = false;

  }

  if (!validators.HasValue(customer.nuDDD) && validators.HasValue(customer.nuPhone)) {

    returnValidate.messages.push('Ao informar o número do telefone é obrigatório informar o DDD!');
    returnValidate.wasSuccess = false;

  }

  if (validators.HasValue(customer.nuPhone) && validators.HasValue(customer.nuDDD)) {

    if (!validators.IsValidPhoneNumber(customer.nuPhone)) {

      returnValidate.messages.push('O número de telefone informado é inválido!');
      returnValidate.wasSuccess = false;

    }

    if (!validators.IsValidDDD()) {

      returnValidate.messages.push('O número de telefone informado é inválido!');
      returnValidate.wasSuccess = false;

    }

  }

  if (!validators.IsValidEmail(customer.deEmail)) {

    returnValidate.messages.push('O e-mail informado é inválidos!');
    returnValidate.wasSuccess = false;

  }

  if (!validators.IsValidDate(customer.dtBirth)) {

    returnValidate.messages.push('A data de nascimento informada é inválida!');
    returnValidate.wasSuccess = false;

  }

  if (validators.IsValidDate(customer.dtBirth)
      && !validators.IsValidAge(customer.dtBirth)) {

    returnValidate.messages.push('A data de nascimento informada não corresponde a uma idade válida!');
    returnValidate.wasSuccess = false;

  }

  return returnValidate;

};