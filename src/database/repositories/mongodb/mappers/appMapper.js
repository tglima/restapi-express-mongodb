/* eslint-disable no-underscore-dangle */

export default function toEntity(appSchemaDB) {
  return {
    id: appSchemaDB._id.toString(),
    appName: appSchemaDB.appName,
    appType: appSchemaDB.appType,
    appConfig: appSchemaDB.appConfig,
    appVersion: appSchemaDB.appVersion,
  };
}
