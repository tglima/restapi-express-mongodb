 #!/bin/sh

#A var nodeEnv define qual será o ambiente da aplicação que o docker deve subir
#Por padrão deixei configurado o ambiente de production
nodeEnv="production"

#Antes de tentar criar o container validamos se o acesso ao MongoDB está OK
#Variáveis auxiliares
prefix="SERVER_PORT="

#Carrego o valor da var serverPortCfg de acordo com o valor definido na tag SERVER_PORT=
serverPortCfg=`cat ./config/env/$nodeEnv.env | grep $prefix | sed "s/'//g" | sed "s/$prefix//g"`
serverPortDck=`grep '[0-9]\{2,6\}:[0-9]\{2,6\}$' docker-compose.yml`

#Carrego o valor da var serverPortDck de acordo com o valor definido no arquivo docker-compose.yml
serverPortDck=`grep '[0-9]\{2,6\}:[0-9]\{2,6\}$' docker-compose.yml`
#Filtro a var serverPortDck pegando agora apenas os números que estão após o caracter :
serverPortDck=`echo $serverPortDck | grep -o "[0-9]*$"`
#Se tudo deu certo um texto assim "- 149:200" após o filtro aplicado acima deve ficar apenas 200


#Abaixo vou validar o valor definido na porta da aplicação é a mesma que está sendo exposta
#Caso sejam diferentes o processo é interrompido
if [ $serverPortCfg -ne $serverPortDck ]
then
  echo -e "As configurações da tag $prefix estão incorretas"
  echo -e "Sincronize os arquivos e tente novamente!"
  exit 1
fi

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


#Remove a pasta dist caso ela exista
rm -rf dist

#Gera o arquivo swagger.json
npm run env NODE_ENV=$nodeEnv node swagger-generation.js

#Gera o build da aplicação
npx sucrase ./src -d ./dist --transforms imports

#Faz uma cópia do arquivo swagger.json para dentro da pasta dist
cp ./src/swagger.json ./dist
clear

#Cria o container e inicia o mesmo
docker-compose up -d --build

#Aguarda o container acabar de subir
sleep 10

#Captura a url gerada
urlAPI=`docker-compose exec webapi get_url_api.sh`

#Exibe a informação para o usuário
echo -e "Tarefa finalizada. \nSwagger disponível em $urlAPI/docs";
