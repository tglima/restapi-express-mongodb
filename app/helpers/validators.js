/* eslint-disable no-restricted-globals */
exports.HasValue = (obj) => {

  if (obj === undefined || obj === null) {

    return false;

  }

  if (obj.length <= 0) {

    return false;

  }

  if (!this.HasNumber(obj) && obj.replace(' ', '').trim().length <= 0) {

    return false;

  }

  return true;

};

exports.HasNumber = (obj) => {

  if (Number.isNaN(Number.parseInt(obj, 2))) {

    return false;

  }

  if (Number.isNaN(Number.parseFloat(obj))) {

    return false;

  }

  return true;

};

exports.IsValidName = (obj) => {

  const name = obj.trim();

  // eslint-disable-next-line security/detect-unsafe-regex
  const regName = /^((([a-zA-Z\u00C0-\u017F]{2,})([\s]{1}))+([a-zA-Z\u00C0-\u017F]{3,}))*$/;

  if (!regName.test(name)) {

    return false;

  }

  if (name.length < 6) {

    return false;

  }

  return true;

};

exports.IsValidDeGender = (obj) => {

  if (!this.HasValue(obj)) {

    return false;

  }

  if (obj.toUpperCase() === 'M' || obj.toUpperCase() === 'F') {

    return true;

  }

  return false;

};

exports.IsValidPhoneNumber = (obj) => {

  const num = obj.trim();
  const regNum = /^(?:[2-8]|9[1-9])[0-9]{3}[0-9]{4}$/;

  if (!regNum.test(num)) {

    return false;

  }

  return true;

};

exports.IsValidDate = (obj) => {

  try {

    if (!this.HasValue(obj)) {

      return false;

    }

    const regname = /^\d{4}-\d{1,2}-\d{1,2}$/;
    if (!regname.test(obj)) {

      return false;

    }

    const date = new Date(obj);

    if (typeof date === 'object'
      && date !== null
      && typeof date.getTime === 'function'
      && !isNaN(date)
    ) {

      return true;

    }

    return false;

  } catch (error) {

    return false;

  }

};

exports.IsValidDDD = (obj) => {

  const num = Number.parseInt(obj, 10);
  if (Number.isNaN(num)) {

    return false;

  }
  if (num < 10 || num > 99) {

    return false;

  }

  return true;

};

exports.IsValidEmail = (obj) => {

  if (!this.HasValue(obj)) {

    return false;

  }

  if (obj.trim().length < 7) {

    return false;

  }

  if (!obj.includes('@') || !obj.includes('.')) {

    return false;

  }

  if (obj.split('@').length - 1 > 1) {

    return false;

  }

  return true;

};

exports.IsValidAge = (obj) => {

  const minAge = 18;
  const maxAge = 100;

  const dateUser = new Date(obj);
  const dateNow = new Date();
  const ageNow = dateNow.getFullYear() - dateUser.getFullYear();
  const isOverMinAge = ageNow >= minAge;
  const isBelowMaxAge = ageNow <= maxAge;

  return isOverMinAge && isBelowMaxAge;

};