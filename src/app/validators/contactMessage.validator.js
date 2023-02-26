import ReturnDTO from '../DTOs/ReturnDTO';
import Config from '../utils/config.util';
import Constants from '../utils/constants.util';
import validator from './validator';

const qtMinCharMessage = Config.getQtMinCharMessage();

class ContactMsgValidator {
  async validateSaveMessage(message) {
    const returnDTO = new ReturnDTO(200, true, []);

    const nuPhoneFull = validator.hasValue(message.deTelephone)
      ? message.deTelephone.replace(/[^0-9]/g, '')
      : undefined;

    if (!validator.isValidName(message.nmContact)) {
      returnDTO.jsonBody.push(Constants.MsgInvalidNave);
      returnDTO.wasSuccess = false;
    }

    if (
      !validator.hasValue(message.deMessage) ||
      message.deMessage.trim().length < qtMinCharMessage
    ) {
      returnDTO.jsonBody.push(Constants.MsgInvalidQtCharMessage);
      returnDTO.wasSuccess = false;
    }

    if (
      validator.hasValue(message.deEmail) &&
      !validator.isValidEmail(message.deEmail)
    ) {
      returnDTO.jsonBody.push.push(Constants.MsgInvalidEmail);
      returnDTO.wasSuccess = false;
    }

    if (
      !validator.hasValue(message.deEmail) &&
      !validator.hasValue(nuPhoneFull)
    ) {
      returnDTO.jsonBody.push(Constants.MsgRequiredFillPhoneOrEmail);
      returnDTO.wasSuccess = false;
    }

    if (validator.hasValue(nuPhoneFull)) {
      if (nuPhoneFull.length < 10 || nuPhoneFull.length > 11) {
        returnDTO.jsonBody.push(Constants.MsgInvalidPhone);
        returnDTO.wasSuccess = false;
        return returnDTO;
      }

      const nuDDD = nuPhoneFull.substring(0, 2);
      const nuPhone = nuPhoneFull.substring(2);

      if (!validator.isValidDDD(nuDDD)) {
        returnDTO.jsonBody.push(Constants.MsgInvalidDDD);
        returnDTO.wasSuccess = false;
      }

      if (!validator.isValidPhoneNumber(nuPhone)) {
        returnDTO.jsonBody.push(Constants.MsgInvalidPhone);
        returnDTO.wasSuccess = false;
      }
    }

    return returnDTO;
  }
}

export default new ContactMsgValidator();
