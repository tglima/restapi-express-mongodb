# Utiliz a imagem do Node.js 20 no Alpine
FROM node:20-alpine

# Pré define o valor das variáveis de ambiente utilizadas pelas aplicaçaõ
# Caso o usuário informe será utilizado o valor definido por ele

ARG NU_PORT=1985
ARG NODE_ENV=homolog
ARG TRUST_PROXY_VALUE=0


# Define as variáveis de ambiente específicas para a aplicação
ENV NU_PORT=$NU_PORT
ENV NODE_ENV=$NODE_ENV
ENV TRUST_PROXY_VALUE=$TRUST_PROXY_VALUE

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/webapi

# Copie os arquivos da pasta 'dist' para o diretório de trabalho
COPY . /usr/src/webapi

# Apaga o arquivo Dockerfile
RUN rm /usr/src/webapi/Dockerfile

#Instala o nano caso precise editar algum arquivo pelo terminal
RUN apk add --no-cache nano

# Atualiza o npm para uma versão mais atual
RUN npm install -g npm@latest

# Instala o pm2 globalmente
RUN npm install pm2 -g

# Instale apenas as dependências de produção do projeto
RUN npm ci --omit=dev

# Exponha a porta configurada
EXPOSE $NU_PORT

# Comando para iniciar o pm2
CMD pm2 start server.js --watch --name webapi --max-memory-restart 128M --no-daemon
