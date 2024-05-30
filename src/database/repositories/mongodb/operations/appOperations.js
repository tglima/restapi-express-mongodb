import AppConfig from '../../../../entities/AppConfig';
import toEntity from '../mappers/appMapper';

const getKeys = (appConfigDb) => {
  const { users } = appConfigDb.auth;
  const keys = users.filter((user) => user.isActive).map((user) => user.key);
  return keys;
};

export default function getAppConfig(appConfigDb) {
  const appEntity = toEntity(appConfigDb);
  const auth = {
    mode: appEntity.appConfig.auth.mode,
    keys: getKeys(appEntity.appConfig),
  };

  const appConfigEntity = new AppConfig(
    appEntity.appConfig.displayName,
    +appEntity.appConfig.sessionTimeout,
    +appEntity.appConfig.cacheTimeout,
    appEntity.appConfig.uri,
    auth
  );

  return appConfigEntity;
}
