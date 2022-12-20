FROM node:16-alpine
WORKDIR /usr/src/webapi
RUN mkdir -p /usr/src/webapi/node_modules && chown -R node:node /usr/src/webapi
COPY package*.json ./
COPY pm2.json ./
RUN npm i -g pm2
RUN npm install
COPY ./docs/shell_script/start_node.sh /usr/local/bin/start_node.sh
COPY ./docs/shell_script/get_url_api.sh /usr/local/bin/get_url_api.sh
RUN chmod +x /usr/local/bin/start_node.sh
RUN chmod +x /usr/local/bin/get_url_api.sh
RUN apk --no-cache add curl
COPY . .
RUN rm -rf /usr/src/webapi/docs/shell_script
CMD ["start_node.sh"]