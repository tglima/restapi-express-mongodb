#!/bin/sh
#Variaveis auxiliares
urlAPI="";

#Carrega o valor das variáveis correspondente a config que esta em execução
prefix="URL_DOMAIN=";
nodeEnv="NODE_ENV=";

#Filtra o arquivo .env correspondente a config que esta em execução e
fileEnv=`printenv | grep $nodeEnv | sed -e 's/\"//g' | sed "s/$nodeEnv//g"`;

#Carrega a URL de acesso a API salva no arquivo .env
urlAPI=`cat config/env/$fileEnv.env | grep $prefix | sed -e 's/\"//g' | sed "s/$prefix//g"`

#Imprimi o resultado para que possa ser capturado fora do container
echo -e $urlAPI | tr -d '\047'
