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
  superUser: {
    idUser: 1, idRole: 1,
  },
  guestUser: {
    idUser: 4, idRole: 999, id: null,
  },
};
module.exports = appConfig;