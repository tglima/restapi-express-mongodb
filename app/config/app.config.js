require('dotenv').config();
const appConfig = {
  token: {
    minutesExpiration: process.env.TOKEN_MINUTES_EXPIRATION,
    secret: process.env.TOKEN_SECRET,
    tokenType: process.env.TOKEN_TYPE,
  },
  superUser: {
    idUserRegister: process.env.ID_SUPER_USER, idRole: Number(process.env.ID_SUPER_ROLE),
  },
  guestUser: {
    idUserRegister: process.env.ID_GUEST_USER, idRole: Number(process.env.ID_GUEST_ROLE),
  },
  nuVersionApi: process.env.API_NUVERSION,
  serverPort: process.env.SERVER_PORT,
  dbConnection: `${process.env.DB_PREFIX_CONN}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}/${process.env.DB_NAME}`,
  qtMinCharMessage: Number(process.env.QT_MIN_CHAR_MESSAGE),
  nuYearsValProduct: Number(process.env.NU_YEARS_VAL_PRODUCT),
};

module.exports = appConfig;