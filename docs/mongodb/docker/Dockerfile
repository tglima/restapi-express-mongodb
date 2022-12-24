FROM mongo:6.0.2
COPY ./shell_script/restore_backup_mongodb.sh /usr/bin/restore_backup_mongodb.sh
COPY ./shell_script/create_user_mongodb.sh /usr/bin/create_user_mongodb.sh
COPY ./dump/dump.tar.gz /tmp/dump.tar.gz
RUN apt-get update
RUN apt-get install curl -y
RUN chmod +x /usr/bin/restore_backup_mongodb.sh
RUN chmod +x /usr/bin/create_user_mongodb.sh