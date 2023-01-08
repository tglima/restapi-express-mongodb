require('dotenv').config();

/**
 * Get DateTime with timeZone America/Sao_Paulo
 *
 */
exports.getDateNowBrazil = () => {

  let dateBr = new Date().toLocaleString(
    process.env.LOCALE_DEF,
    { timeZone: process.env.LOCAL_TIMEZONE },
  );

  dateBr = (new Date(dateBr)).toISOString();
  return dateBr;

};