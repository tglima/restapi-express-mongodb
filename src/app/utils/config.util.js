import dotenv from 'dotenv';
import Constants from './constants.util';

const envMode = process.env.NODE_ENV || Constants.development;
const path = `./config/env/${envMode}.env`;

class ConfigUtil {
  constructor() {
    dotenv.config({ path });
  }

  getNuVersionApi() {
    return +process.env.API_NU_VERSION || 1;
  }

  getUrlDomain() {
    return process.env.URL_DOMAIN;
  }

  getUrlBaseApi() {
    return `/api/v${process.env.API_NU_VERSION}`;
  }

  getServerPort() {
    return +process.env.SERVER_PORT || 30000;
  }

  getDbConnectionString() {
    return `${process.env.DB_PREFIX_CONN}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}/${process.env.DB_NAME}?authMechanism=DEFAULT`;
  }

  getTokenMinutesExpiration() {
    return +process.env.TOKEN_MINUTES_EXPIRATION || 60;
  }

  getTokenSecret() {
    return process.env.TOKEN_SECRET;
  }

  getTokenType() {
    return process.env.TOKEN_TYPE;
  }

  getIdSuperUser() {
    return process.env.ID_SUPER_USER;
  }

  getIdRoleSuperUser() {
    return +process.env.ID_SUPER_ROLE || 1;
  }

  getIdGuestUser() {
    return process.env.ID_GUEST_USER;
  }

  getIdRoleGuestUser() {
    return +process.env.ID_GUEST_ROLE || 999;
  }

  getNodeEnv() {
    return envMode;
  }

  getQtMinCharMessage() {
    return +process.env.QT_MIN_CHAR_MESSAGE || 20;
  }

  getMinAgeSellProduct() {
    return +process.env.MIN_AGE_SELL_PRODUCT || 18;
  }

  getMaxAgeSellProduct() {
    return +process.env.MAX_AGE_SELL_PRODUCT || 100;
  }

  getYearsValidateProduct() {
    return +process.env.NU_YEARS_VAL_PRODUCT || 1;
  }

  getMsgServerStarted() {
    return `Servidor iniciado - Express rodando na porta: ${this.getServerPort()}`;
  }

  getMsgSwaggerUp() {
    const urlDomain = this.getUrlDomain();
    const urlSwagger = `${urlDomain}${this.getPathSwagger()}`
      .replaceAll('"', '')
      .replaceAll("'", '');

    return `Swagger disponível em: ${urlSwagger}`;
  }

  getPathSwagger() {
    return process.env.PATH_SWAGGER;
  }
}

export default new ConfigUtil();
