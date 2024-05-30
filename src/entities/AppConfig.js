class AppConfig {
  constructor(displayName, sessionTimeout, cacheTimeout, uri, auth) {
    this.displayName = displayName;
    this.sessionTimeout = sessionTimeout;
    this.cacheTimeout = cacheTimeout;
    this.uri = uri;
    this.auth = auth;
  }
}
export default AppConfig;
