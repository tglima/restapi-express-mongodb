const appConfig = {
  api:
  {
    nuVersion: '1',
  },
  server:
  {
    port: 4200,
  },
  token: {
    minutesExpiration: 300, secret: 'secretBearerToken', tokenType: 'Bearer',
  },
  db: {
    username: 'userdb', password: 'userpass_mongodb', serverAndPort: 'localhost:27017', nmDatabase: 'applicationdb',
  },
};
module.exports = appConfig;