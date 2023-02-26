import ReturnDTO from '../DTOs/ReturnDTO';
import Constants from '../utils/constants.util';
import validator from './validator';

class CustomerValidator {
  async validateSaveCustomer(customer) {
    const returnDTO = new ReturnDTO(0, true, []);

    if (!validator.isValidName(customer.nmCustomer)) {
      returnDTO.wasSuccess = false;
      returnDTO.jsonBody.push(Constants.MsgInvalidName);
    }

    if (!validator.isValidDeGender(customer.deGender)) {
      returnDTO.wasSuccess = false;
      returnDTO.jsonBody.push(Constants.MsgInvalidGender);
    }

    if (!validator.isValidNuDoc(customer.nuDocument)) {
      returnDTO.wasSuccess = false;
      returnDTO.jsonBody.push(Constants.MsgInvalidDoc);
    }

    if (
      !validator.hasValue(customer.deEmail) &&
      !validator.hasValue(customer.nuDDD) &&
      !validator.hasValue(customer.nuPhone)
    ) {
      returnDTO.wasSuccess = false;
      returnDTO.jsonBody.push(Constants.MsgRequiredPhoneOrEmail);
      return returnDTO;
    }

    if (
      validator.hasValue(customer.nuDDD) &&
      !validator.hasValue(customer.nuPhone)
    ) {
      returnDTO.wasSuccess = false;
      returnDTO.jsonBody.push(Constants.MsgRequiredPhoneHasDDD);
    }

    if (
      !validator.hasValue(customer.nuDDD) &&
      validator.hasValue(customer.nuPhone)
    ) {
      returnDTO.wasSuccess = false;
      returnDTO.jsonBody.push(Constants.MsgRequiredDDDHasPhone);
    }

    if (
      validator.hasValue(customer.nuPhone) &&
      validator.hasValue(customer.nuDDD)
    ) {
      if (!validator.isValidPhoneNumber(customer.nuPhone)) {
        returnDTO.wasSuccess = false;
        returnDTO.jsonBody.push(Constants.MsgInvalidPhone);
      }

      if (!validator.isValidDDD(customer.nuDDD)) {
        returnDTO.wasSuccess = false;
        returnDTO.jsonBody.push(Constants.MsgInvalidDDD);
      }
    }

    if (!validator.isValidEmail(customer.deEmail)) {
      returnDTO.wasSuccess = false;
      returnDTO.jsonBody.push(Constants.MsgInvalidEmail);
    }

    if (!validator.isValidDate(customer.dtBirth)) {
      returnDTO.wasSuccess = false;
      returnDTO.jsonBody.push(Constants.MsgInvalidDtBirth);
    }

    if (
      validator.isValidDate(customer.dtBirth) &&
      !validator.isValidAge(customer.dtBirth)
    ) {
      returnDTO.wasSuccess = false;
      returnDTO.jsonBody.push(Constants.MsgInvalidDtBirthAlt);
    }

    return returnDTO;
  }
}

export default new CustomerValidator();
