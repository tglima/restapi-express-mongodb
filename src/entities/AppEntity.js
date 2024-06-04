class AppEntity {
  constructor(id, app_id, app_name, app_type, app_config, app_version) {
    this.id = id;
    this.app_id = app_id;
    this.app_name = app_name;
    this.app_type = app_type;
    this.app_config = app_config;
    this.app_version = app_version;
  }
}

export default AppEntity;
