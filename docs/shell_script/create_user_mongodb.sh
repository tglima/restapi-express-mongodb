#!/bin/sh

#Aguarda o container ficar disponível e acessível na porta 27017
RESULT=''
while [ "$RESULT" != "200" ]
do
  RESULT=$(curl -o /dev/null -s -w "%{http_code}\n" 127.0.0.1:27017)
  echo "Aguardando se conectar na rede...";
  sleep 5;
done

#Cria o usuário de acesso ao banco e que usaremos na aplicação posteriormente
echo "Criando os usuários de acesso ao banco";
/usr/bin/mongosh mongodb://127.0.0.1/admin --quiet -u 'tglima' -p 'mongoContainer' --authenticationDatabase admin --eval "db.createUser({ user: 'userdb', pwd: 'userpass_mongodb', roles: [ { role: 'readWrite', db: 'applicationdb' } ] })"
/usr/bin/mongosh mongodb://127.0.0.1/applicationdb --quiet -u 'tglima' -p 'mongoContainer' --authenticationDatabase admin --eval "db.createUser({ user: 'userdb', pwd: 'userpass_mongodb', roles: [ { role: 'readWrite', db: 'applicationdb' } ] })"

echo "Script create_user_mongodb.sh finalizado";