#!/usr/bin/env bash

sudo apt-get update
sudo apt-get -y upgrade

sudo apt-get -y install redis-server
sudo apt-get -y install git

# NODEJS

curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
apt-get -y install nodejs
sudo ln -s /usr/bin/nodejs /usr/sbin/node

# Yarn

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt --assume-yes install --no-install-recommends yarn

# Postgresql 9.4

sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'
sudo apt install wget ca-certificates
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add
sudo apt update
sudo apt-get -y install postgresql-9.4 postgresql-server-dev-9.4 pgadmin3 python-psycopg2

echo "local all postgres peer" > /etc/postgresql/9.4/main/pg_hba.conf
echo "local moodboard_db commite md5" >> /etc/postgresql/9.4/main/pg_hba.conf
echo "local all all peer" >> /etc/postgresql/9.4/main/pg_hba.conf
echo "host all all 127.0.0.1/32 md5" >> /etc/postgresql/9.4/main/pg_hba.conf
echo "host all all ::1/128 md5" >> /etc/postgresql/9.4/main/pg_hba.conf

service postgresql restart

sudo -u postgres bash -c "psql -c \"CREATE USER commite WITH PASSWORD 'commite';\""
sudo -u postgres createdb --owner=commite --encoding=UTF8 moodboard_db

echo "export PATH=\$PATH:/opt/yarn-1.19.1/bin" >> /home/vagrant/.profile
echo "export PATH=\$PATH:/home/vagrant/moodboard/node_modules/.bin" >> /home/vagrant/.profile
echo "cd /home/vagrant/moodboard" >> /home/vagrant/.profile

su - vagrant << EOF
cd /home/vagrant/moodboard/
yarn install
EOF

# Redis
echo "unixsocket /var/run/redis/redis.sock" >> /etc/redis/redis.conf
echo "unixsocketperm 777" >> /etc/redis/redis.conf
echo "maxmemory 64mb" >> /etc/redis/redis.conf
sed -i.bak "s/^bind 127.0.0.1$/# bind 127.0.0.1/" /etc/redis/redis.conf
sed -i.bak "s/^port 6379$/# port 6379/" /etc/redis/redis.conf

service redis-server restart
