import appRepository from '../database/repositories/mongodb/AppRepository';

const appConfig = async () => {
  return appRepository.getAppConfigById(process.env.APP_ID);
};

export const GetApiKeys = async () => {
  const { auth } = await appConfig();
  return auth.keys;
};

export const ENV_MODE = `${process.env.NODE_ENV || 'develop'}`;
export const NU_PORT = +process.env.NU_PORT || 9090;
export const URL_SWAGGER = `${process.env.URL_SWAGGER || `http://localhost:${NU_PORT}/api-docs`}`;
export const TRUST_PROXY = 'trust proxy';
export const TRUST_PROXY_VALUE = +process.env.TRUST_PROXY_VALUE || 0;
