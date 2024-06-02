class AppConfig {
  constructor(display_name, session_timeout, cache_timeout, uri, auth) {
    this.display_name = display_name;
    this.session_timeout = session_timeout;
    this.cache_timeout = cache_timeout;
    this.uri = uri;
    this.auth = auth;
  }
}
export default AppConfig;
