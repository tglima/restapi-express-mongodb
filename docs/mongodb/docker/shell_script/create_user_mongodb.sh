#!/bin/sh

#Aguarda o container ficar disponível e acessível na porta 27017
RESULT=''
while [ "$RESULT" != "200" ]
do
  RESULT=$(curl -o /dev/null -s -w "%{http_code}\n" 127.0.0.1:$DB_PORT)
  echo "Aguardando se conectar na rede...";
  sleep 2;

  qtAttemp=$((qtAttemp+1))
  if [ $qtAttemp -ge 5 ]
  then
      clear
      echo -e "Não foi possível se conectar ao MongoDB!";
      exit 1
  fi
done

#Cria o usuário de acesso ao banco e que usaremos na aplicação posteriormente
echo "Criando os usuários de acesso ao banco";
/usr/bin/mongosh mongodb://127.0.0.1/admin --quiet -u "'$MONGO_INITDB_ROOT_USERNAME'" -p "'$MONGO_INITDB_ROOT_PASSWORD'" --authenticationDatabase admin --eval "db.createUser({ user: '$DB_USERNAME', pwd: '$MONGO_INITDB_ROOT_PASSWORD', roles: [ { role: 'readWrite', db: '$DB_NAME' } ] })"
/usr/bin/mongosh mongodb://127.0.0.1/applicationdb --quiet -u 'tglima' -p 'mongoContainer' --authenticationDatabase admin --eval "db.createUser({ user: '$DB_USERNAME', pwd: '$DB_PASSWORD', roles: [ { role: 'readWrite', db: '$DB_NAME' } ] })"

echo "Script create_user_mongodb.sh finalizado";