#!/bin/sh
#Variaveis auxiliares
urlAPI="";
prefix="URL_DOMAIN=";
#Filtra o arquivo .env da api para capturar a url pública da API gerada pelo localtunnel
urlAPI=`cat .env | grep $prefix | sed -e 's/\"//g' | sed "s/$prefix//g"`
#Imprimi o resultado para que possa ser capturado fora do container
echo -e $urlAPI
