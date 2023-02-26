/* eslint-disable no-console */
import app from './app';
import config from './app/utils/config.util';

console.log('Loading env files....');
console.log(`Env mode: ${config.getNodeEnv()}!`);

app.listen(
  config.getServerPort(),
  console.warn(config.getMsgServerStarted()),
  console.warn(config.getMsgSwaggerUp())
);
