#!/bin/sh
#Caso exista o arquivo swagger.json removemos
rm -f /usr/src/app/swagger.json
#Criamos um novo arquivo swagger.json
touch /usr/src/app/swagger.json
#Atualizamos o arquivos com a documentação do swagger
node  /usr/src/app/swagger-generation.js
#Iniciamos o pm2 para iniciar e gerenciar nossa aplicação
pm2-runtime start /usr/src/app/pm2.json