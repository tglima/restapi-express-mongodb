 #!/bin/sh
#Remove a pasta dump caso ela exista
rm -rf ./dump
#Copiamos a pasta dump para ser utilizada na criação do nosso container.
cp -R ../dump ./
#Cria o container e inicia o mesmo
docker-compose up -d --build
#Remove a pasta dump caso ela exista
rm -rf ./dump
#Aguarda o container acabar de subir
sleep 5
#Tenta restaurar o backup
docker-compose exec mongo_db restore_backup_mongodb.sh
#Tenta criar o usuário padrão que será utilizado pela aplicação
docker-compose exec mongo_db create_user_mongodb.sh
#Exibe a informação para o usuário
echo -e "Tarefa finalizada. Verifique se o container foi criado com sucesso!";