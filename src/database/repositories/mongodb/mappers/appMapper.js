/* eslint-disable no-underscore-dangle */

export default function toEntity(appSchemaDB) {
  return {
    id: appSchemaDB._id.toString(),
    app_name: appSchemaDB.app_name,
    app_type: appSchemaDB.app_type,
    app_config: appSchemaDB.app_config,
    app_version: appSchemaDB.app_version,
  };
}
