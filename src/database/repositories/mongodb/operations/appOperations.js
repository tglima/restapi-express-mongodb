import AppConfig from '../../../../entities/AppConfig';
import toEntity from '../mappers/appMapper';

const getKeys = (appConfigDb) => {
  const { users } = appConfigDb.auth;
  const keys = users.filter((user) => user.is_active).map((user) => user.key);
  return keys;
};

export default function getAppConfig(appConfigDb) {
  const appEntity = toEntity(appConfigDb);
  const auth = {
    mode: appEntity.app_config.auth.mode,
    keys: getKeys(appEntity.app_config),
  };

  const appConfigEntity = new AppConfig(
    appEntity.app_config.display_name,
    +appEntity.app_config.session_timeout,
    +appEntity.app_config.cache_timeout,
    appEntity.app_config.uri,
    auth
  );

  return appConfigEntity;
}
