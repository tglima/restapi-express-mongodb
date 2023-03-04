#!/bin/sh
#Variáveis auxiliares
nodeEnv=$NODE_ENV;

prefix="DB_SERVER=";
#Carrego a URL do mongo que está configurada no arquivo .env
urlDB=`cat ./config/env/$nodeEnv.env | grep $prefix | sed "s/'//g" | sed "s/$prefix//g"`

prefix="DB_PREFIX_CONN=";
#Carrego o prefixo da conexão do mongo que está configurada no arquivo .env
dbPrefixConn=`cat ./config/env/$nodeEnv.env | grep $prefix | sed "s/'//g" | sed "s/$prefix//g"`

RESULT=''

#Caso o início da var dbPrefixConn não seja mongodb significa que a conexão do banco pode
#ser direto na MongoDB/AWS, sendo assim não temos como testar a conexão por aqui
#desta forma já carregamos a var RESULT com o valor 200 para que ele pule o while
if [ $dbPrefixConn != 'mongodb' ]
then
  RESULT='200'
fi

#Tenta 5x se conectar ao mongo antes de tentar criar o container
#Caso o status retornado não seja 200 mesmo após as 5 tentativas, o processo é interrompido
qtAttemp=0;
while [ "$RESULT" != "200" ]
do
  sleep 2;
  RESULT=$(curl -o /dev/null -s -w "%{http_code}\n" $urlDB)
  echo -e "Tentando se conectar ao mongodb";
  qtAttemp=$((qtAttemp+1))
  if [ $qtAttemp -ge 5 ]
  then
      echo "Não foi possível se conectar ao MongoDB!";
      exit 1
  fi
done
clear
#Iniciamos o pm2 para iniciar e gerenciar nossa aplicação
pm2-runtime start /usr/src/webapi/pm2.json
