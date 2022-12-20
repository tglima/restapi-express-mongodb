 #!/bin/sh
#Antes de tentar criar o container validamos se o acesso ao MongoDB está OK
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
      echo -e "Não foi possível se conectar ao MongoDB!";
      exit 1
  fi
done
clear
#Cria o container mas não inicia o mesmo
docker-compose create --build
#Inicia o container
docker-compose start
#Aguarda o container acabar de subir
sleep 10
#Captura a url gerada pelo localtunnel
urlAPI=`docker-compose exec webapi get_url_api.sh`
#Exibe a informação para o usuário
echo -e "Tarefa finalizada. \nSwagger disponível em $urlAPI/docs";