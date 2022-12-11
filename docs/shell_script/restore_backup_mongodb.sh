#!/bin/sh

#Aguarda o container ficar disponível e acessível na porta 27017
RESULT=''
while [ "$RESULT" != "200" ]
do
  RESULT=$(curl -o /dev/null -s -w "%{http_code}\n" 127.0.0.1:27017)
  echo "Aguardando se conectar na rede...";
  sleep 5;
done

#Descompacta o backup
echo "Descompactando dump...";
/usr/bin/tar -xzf /tmp/dump.tar.gz -C /tmp

#Restaura o backup, criando o banco de dados da aplicação
echo "Restaurando dump...";
/usr/bin/mongorestore --username tglima --password mongoContainer --authenticationDatabase admin --db applicationdb /tmp/applicationdb

#Apaga os arquivos que foram extraídos e restaurados
echo "Apagando dump...";
rm -rf /tmp/applicationdb


echo "Script restore_backup_mongodb.sh finalizado";