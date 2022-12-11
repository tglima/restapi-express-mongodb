 #!/bin/sh
#Remove os containers e destroi a rede criada
docker-compose down
#Remove a imagem do container db
docker rmi db
#Remove a imagem do container app
docker rmi app
echo "Tarefa finalizada";