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
    username: 'applicationdb', password: 'passAppDB',
  },
};
module.exports = appConfig;