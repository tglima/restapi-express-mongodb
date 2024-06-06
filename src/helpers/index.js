import moment from 'moment';

export const getCurrentDateTime = () => {
  return moment().toISOString();
};

export const getCurrentEpoch = () => {
  return moment().valueOf();
};

export const getFutureDate = (days) => {
  return moment().add(days, 'days').toISOString();
};
