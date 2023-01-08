const moment = require('moment');
require('dotenv').config();

/**
 * Get DateTime with timeZone America/Sao_Paulo
 *
 */
exports.getDateNowBrazil = () => {

  const dateBr = moment().subtract({ hours: 3 }).format('YYYY-MM-DDTHH:mm:ss.sss');
  return dateBr;

};