 #!/bin/sh
#Remove os container, destroi a rede criada e a image gerada
docker-compose --env-file ./config/env/production.env down --rmi all -v
echo "Tarefa de remoção de container finalizada";
