#!/bin/sh
#Variáveis auxiliares
qtAttemp=0;

#Carrega o valor das variáveis correspondente a config que esta em execução
prefix="DB_SERVER=";
nodeEnv="NODE_ENV=";

#Filtra o arquivo .env correspondente a config que esta em execução e
fileEnv=`printenv | grep $nodeEnv | sed -e 's/\"//g' | sed "s/$nodeEnv//g"`;

#Pega a URL do mongo que está configurada no arquivo .env
urlDB=`cat ./config/env/$fileEnv.env | grep $prefix | sed "s/'//g" | sed "s/$prefix//g"`

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
#Iniciamos o pm2 para iniciar e gerenciar nossa aplicação
pm2-runtime start /usr/src/webapi/pm2.json
