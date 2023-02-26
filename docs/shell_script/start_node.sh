#!/bin/sh
#Variáveis auxiliares
qtAttemp=0;
prefix="DB_SERVER=";
#Pega a URL do mongo que está configurada no arquivo .env
urlDB=`cat .env | grep $prefix | sed "s/'//g" | sed "s/$prefix//g"`
#Tenta se conectar ao mongo antes de tentar criar o container
clear
RESULT=''
while [ "$RESULT" != "200" ]
do
  sleep 2;
  RESULT=$(curl -o /dev/null -s -w "%{http_code}\n" $urlDB)
  echo -e "Tentando se conectar ao mongodb";
  qtAttemp=$((qtAttemp+1))
  if [ $qtAttemp -ge 5 ]
  then
      echo "Não foi possível se conectar ao MongoDB!"
      exit 1
  fi
done
#Carrega a URL externa
node /usr/src/webapi/docs/nodejs_helper/load-external-uri.js &
#Caso exista o arquivo swagger.json removemos
rm -f /usr/src/webapi/swagger.json;
#Agurda 15 segundos
sleep 15
#Criamos um novo arquivo swagger.json
touch /usr/src/webapi/swagger.json
#Atualizamos o arquivos com a documentação do swagger
node /usr/src/webapi/swagger-generation.js
#Iniciamos o pm2 para iniciar e gerenciar nossa aplicação
pm2-runtime start /usr/src/webapi/pm2.json
