 #!/bin/sh
#Cria os containers mas não inicia os mesmos
docker-compose create --build
#Inicia o container db para realizar algumas configurações nele
docker-compose start db
#Restaura os dados do banco
docker-compose exec db restore_backup_mongodb.sh
#Cria o usuário padrão da aplicação
docker-compose exec db create_user_mongodb.sh
#Remove o script que restaurar os backups
docker-compose exec db rm -f /usr/bin/restore_backup_mongodb.sh
#Remove o script que cria os usuários
docker-compose exec db rm -f /usr/bin/create_user_mongodb.sh
#Para o container db para que ele seja iniciado posteriormente
docker container stop db
#Limpo o console para limpar dados os outputs anteriores
clear
#Inicio os dois containers de uma só vez
docker-compose start
#Exibe mensagem para usuário
echo "Tarefa finalizada. Acesse: http://localhost:4200/docs/";