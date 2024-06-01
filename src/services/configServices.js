import mongoose from 'mongoose';
import appRepository from '../database/repositories/mongodb/AppRepository';

export const getDbConnection = () => {
  const envMode = `${process.env.NODE_ENV || 'develop'}`;

  const connectionString = process.env.MONGODB_CONNECTION_STRING.replace(
    '<password>',
    process.env.MONGODB_PASS
  );

  if (envMode !== 'test') {
    mongoose.connect(connectionString);
  }
};

const appConfig = async () => {
  return appRepository.getAppConfigById(process.env.APP_ID);
};

export const GetApiKeys = async () => {
  const { auth } = await appConfig();
  return auth.keys;
};

export const ENV_MODE = `${process.env.NODE_ENV || 'develop'}`;
export const NU_PORT = +process.env.NU_PORT || 9090;
export const URL_SWAGGER = `${process.env.URL_SWAGGER || `http://localhost:${NU_PORT}/swagger`}`;
export const TRUST_PROXY = 'trust proxy';
export const TRUST_PROXY_VALUE = +process.env.TRUST_PROXY_VALUE || 0;
