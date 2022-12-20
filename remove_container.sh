 #!/bin/sh
#Remove os containers e destroi a rede criada
docker-compose down
#Remove a imagem do container db
#Remove a imagem do container app
docker rmi webapi
echo "Tarefa de remoção de container finalizada";